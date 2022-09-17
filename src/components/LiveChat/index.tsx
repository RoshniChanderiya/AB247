import { Col, Row, Space, useWindowDimentions } from '@autobid247/theme';
import get from 'lodash/get';
import last from 'lodash/last';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import CarImageGallery from '@/components/CarImageGallery';
import { useSocket } from '@/hooks/socket';
import useAuth from '@/hooks/useAuth';
import { useVehicle } from '@/hooks/vehicle';
import { Vehicle } from '@/types/vehicle';
import { formatNumber } from '@/utils/generic';

import Loader from '../Loader';
import BuySaleOptions from './BuyerOptions';
import Message, { IMessage } from './Message';
import PriceAndOffer from './PriceAndOffer';
import SendMessage from './SendMessage';
import styles from './styles.module.scss';
import VehicleMetaDetails from './VehicleMetaDetails';

interface VehicleCardProps {
  vin: string;
  buyerId: string;
}
const LiveChat: React.FC<VehicleCardProps> = ({ vin, buyerId }) => {
  const socket = useSocket();
  const { user } = useAuth();
  const { isMobile } = useWindowDimentions();
  const chatRef = useRef<HTMLDivElement>(null);
  const { isLoading, data: vehicleDetails } = useVehicle(vin);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typingTimerRef = useRef<any>();

  const [isTyping, setIsTyping] = useState(false);

  const loggedIndealerId = user?.dealer?.id;

  const vehiclePayload: Vehicle['_source']['payload'] = get(
    vehicleDetails,
    '_source.payload',
  );
  const sellerId = 'sellerId' || get(vehiclePayload, 'dealer.id');

  const [allMessages, setMessages] = useState<IMessage[]>([]);

  const lastOffer = useMemo(
    () => last(allMessages.filter(({ isOffer }) => isOffer)),
    [allMessages, sellerId],
  );

  const lastOfferBy = lastOffer?.sentBy;
  const lastOfferAmount =
    lastOffer?.amount || get(vehicleDetails, '_source.payload.price');
  const isSeller = loggedIndealerId !== buyerId || loggedIndealerId === sellerId;

  const onTyping = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }
    setIsTyping(true);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const onNewMessage = (newMessage: string) => {
    setIsTyping(false);
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }
    setMessages((prev) => {
      const newMessages = Object.assign([], prev);
      let actualMessage = {
        text: newMessage,
        time: new Date().toString(),
      };
      try {
        actualMessage = JSON.parse(newMessage);
      } catch (error) {
        console.warn(error);
      }
      newMessages.push(actualMessage);
      return newMessages;
    });
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (socket && buyerId && sellerId && !socket.hasListeners('message')) {
      socket.emit(
        'join',
        JSON.stringify({
          buyerId,
          sellerId,
          userType: isSeller ? 'seller' : 'buyer',
        }),
      );
      socket.on('message', onNewMessage);
      socket.on('typing', onTyping);
    }
  }, [socket, buyerId, isSeller, sellerId]);

  const sendMessage = (message: IMessage) => {
    if (!socket) {
      return;
    }
    socket.emit('message', JSON.stringify(message));
  };
  const makeOffer = (amount: number) => {
    sendMessage({
      text: `Hi would you like to ${isSeller ? 'take' : 'sell'} it for ${formatNumber(
        amount,
      )}?`,
      time: new Date().toString(),
      sentBy: loggedIndealerId,
      isOffer: true,
      name: user?.name,
      amount,
    });
  };
  const setTyping = () => {
    socket?.emit('typing', {
      name: user?.name,
    });
  };

  const buyDisabled = lastOfferBy === loggedIndealerId;

  return (
    <div className={styles.chatContainer}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <PriceAndOffer
            offerAmount={lastOfferAmount}
            onOffer={makeOffer}
            buyDisabled={buyDisabled}
            isSeller={isSeller}
          />
          <Row>
            {!isMobile && (
              <Col md={6}>
                {!isMobile && (
                  <Space direction="vertical">
                    <CarImageGallery vin={vin} />
                    <VehicleMetaDetails
                      listingDate={vehiclePayload.listing_first_date}
                      miles={vehiclePayload.mileage}
                      price={vehiclePayload.price}
                    />
                  </Space>
                )}
              </Col>
            )}
            <Col md={isMobile ? 12 : 6}>
              <div className={styles.chatBox}>
                <Space direction="vertical" className={styles.messageContainer}>
                  {allMessages.map((message, index) => {
                    const isNextMessageBySame =
                      message.sentBy === allMessages[index + 1]?.sentBy;
                    return (
                      <Message
                        key={`${message.text}-${message.time}-${buyerId}-${loggedIndealerId}`}
                        text={message.text}
                        time={isNextMessageBySame ? undefined : message.time}
                        isSent={message.sentBy === loggedIndealerId}
                        name={message.name}
                      />
                    );
                  })}
                  {isTyping && <Message text="...." />}
                  <div ref={chatRef} />
                </Space>
                <div className={styles.chatFooter}>
                  <SendMessage
                    onSend={(text) =>
                      sendMessage({
                        text,
                        time: new Date().toString(),
                        sentBy: user?.dealer?.id,
                        name: user?.name,
                      })
                    }
                    onTyping={setTyping}
                  />
                  <BuySaleOptions buttonDisabled={buyDisabled} isSeller={isSeller} />
                </div>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </div>
  );
};

export default LiveChat;

import get from 'lodash/get';
import React from 'react';
import { useParams } from 'react-router-dom';

import LiveChat from '@/components/LiveChat';
import Loader from '@/components/Loader';
import { useInventory } from '@/hooks/inventory';

import styles from './styles.module.scss';

const ChatPage: React.FC = () => {
  const { configId, vin } = useParams() as { configId: string; vin: string };

  const { isLoading, data } = useInventory(configId);

  const buyerId = get(data, '_source.payload.userId.id');

  return (
    <div className={styles.chatContainer}>
      {isLoading && <Loader />}
      {!isLoading && <LiveChat vin={vin} buyerId={buyerId} />}
    </div>
  );
};

export default ChatPage;

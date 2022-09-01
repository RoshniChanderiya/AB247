import Button from "@/components/Button";
import { FloorPriceRef } from "@/components/FloorPriceInput";
import { Auction } from "@/types/auction";
import { formatNumber } from "@/utils/NumberFomatter";
import get from "lodash/get";
import React, { useRef } from "react";
import { Col, Row } from "reactstrap";
import FloorPrice, { FloorPriceContainerRef } from "../../FloorPrice";
import styles from "./styles.module.scss";

interface DropBidProps {
  isWaiting: boolean;
  auction: Auction;
}
const QuickBids = [25, 50, 75, 100];

const DropBid: React.FC<DropBidProps> = ({ isWaiting, auction }) => {
  const inputRef = useRef<FloorPriceRef>({
    setBidAmount: () => {},
  });
  const containerRef = useRef<FloorPriceContainerRef>({
    placeBid: async () => {},
  });

  const onQuickBid = (amount: number) => {
    const currentBid = get(auction, "payload.current_low_bid", 0);
    inputRef.current.setBidAmount(currentBid - amount);
    containerRef.current.placeBid(currentBid - amount);
  };
  return (
    <>
      {isWaiting ? (
        <div>
          <p className={styles.profile}>AUCTION STATUS</p>
          <div className={styles.auctionStatus}>
            <h1 className="text-center">You are the Lowest Bidder</h1>
            <p className={styles.subtext}>Waiting on buyer signature</p>
          </div>
        </div>
      ) : (
        <div className={styles.auctionStatus}>
          <FloorPrice
            auction={auction}
            label="Lowest Bid"
            inputRef={inputRef}
            ref={containerRef}
            showCurrentBid
          />
          <h6>Drop Bid</h6>
          <Row className="d-flex justify-content-between">
            {QuickBids.map((amount) => (
              <Col xs={4} sm={3} key={amount}>
                <Button
                  size="sm"
                  outline
                  className="w-100"
                  onClick={() => onQuickBid(amount)}
                >
                  {formatNumber(amount, {
                    minimumFractionDigits: 0,
                  })}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default DropBid;

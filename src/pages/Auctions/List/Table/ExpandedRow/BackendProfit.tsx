import BackendProfit from "@/components/BackendProfit";
import { Auction } from "@/types/auction";
import React from "react";
import styles from "./styles.module.scss";

interface BackendProfitProps {
  auction: Auction;
}
const BackendProfitView: React.FC<BackendProfitProps> = ({ auction }) => {
  return (
    <>
      <p className={styles.priceSubText}>ESTIMATED BACKEND PROFIT</p>
      <h5 className={styles.price}>
        <BackendProfit auction={auction} />
      </h5>
    </>
  );
};

export default BackendProfitView;

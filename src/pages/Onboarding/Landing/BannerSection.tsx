import { HeroImage } from "@/assets/images";
import React from "react";
import styles from "./styles.module.scss";

const BannerSection = () => {
  return (
    <div>
      <div className={styles.backgroundArea}>
        <img className={styles.backgroundImage} alt="" src={HeroImage} />
        <div className={styles.imageText}>
          <div>
            <h1>
              BidWizer Partners <br /> with Dealers
            </h1>
            {/* <h1>with Dealers</h1> */}
            <ul>
              <h3 className={styles.ulText}>We Provide 3 Solutions</h3>
              <li className={styles.liText}>Sell Retail Inventory</li>
              <li className={styles.liText}>Private Vehicle Sourcing</li>
              <li className={styles.liText}>Wholesale Solutions</li>
            </ul>
          </div>
        </div>
        <div className={styles.bannerFooter}>
          Buy Wiser, Sell Wiser, BidWizer...
        </div>
      </div>
    </div>
  );
};
export default BannerSection;

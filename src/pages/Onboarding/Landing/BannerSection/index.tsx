import { BannerImage } from "@/assets/images";
import CompanyName from "@/components/CompanyName";
import styles from "./styles.module.scss";

const BannerSection = () => {
  return (
    <div className={styles.backgroundArea}>
      <img
        src={BannerImage}
        alt="Banner"
      />
      <div className={styles.imageText}>
        <div>
          <h1 className={styles.heading}>
            BidWizer Partners <p>with Dealers</p>
          </h1>
          <h3 className={styles.ulText}>We Provide 3 Solutions</h3>
          <ul>
            <li className={styles.liText}>Sell Retail Inventory</li>
            <li className={styles.liText}>Private Vehicle Sourcing</li>
            <li className={styles.liText}>Wholesale Solutions</li>
          </ul>
        </div>
      </div>
      <div className={styles.bannerFooter}>
        Buy Wiser, Sell Wiser, <CompanyName />
        ...
      </div>
    </div>
  );
};
export default BannerSection;

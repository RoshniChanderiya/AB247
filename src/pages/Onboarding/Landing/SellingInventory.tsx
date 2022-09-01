import Button from "@/components/Button";
import styles from "./styles.module.scss";
import { Col, Row } from "reactstrap";
import { mapFlorida, IconPlay } from "@/assets/images";
const SellingInventory = () => {
  return (
    <div>
      <h1 className={styles.textTitle}>Selling Your Retail Inventory</h1>
      <Row>
        <Col lg={6} className={styles.mainSeaction}>
          <div>
            <h2 className={styles.sellingHeading}>More Reach - More Revenue</h2>
            <div className={styles.sellingList}>
              <ul className="mt-3 text-start">
                <li>It's FREE-We're Unemployed Until We Make A Sale</li>
                <li>We Deliver DEALS, Not Leads</li>
                <li>We Give The Dealer ALL The Back-end Revenue</li>
                <li>Hang the Paper with Your Bank of Choice</li>
                <li>Increase Your Marketing Reach 10-FOLD</li>
                <li>Get Deals You Would Never Have Gotten </li>
                <li>Dealers Control Their Pricing</li>
                <li>No Salesman to Pay</li>
                <li>Sell Your Inventory 24 Hours a Day</li>
                <li>No Listing Fees</li>
                <li>Cloud Based Inventory Management Tool</li>
                <li>Capture Trade-ins,Increase Inventory</li>
                <li>Real-Time Data, Trends and Business Intelligence</li>
              </ul>
            </div>
            <div className={styles.footerBtn}>
              <Button filled>ONE SIGN UP - GET ALL 3</Button>
            </div>
            <div className="w-100 d-flex justify-content-center mt-5"></div>
          </div>
        </Col>
        <Col lg={6} className={styles.mapSection}>
          <img src={IconPlay} className={styles.video} alt="" />
          <img src={mapFlorida} alt="simple" className={styles.mapImg} />
        </Col>
      </Row>
    </div>
  );
};
export default SellingInventory;

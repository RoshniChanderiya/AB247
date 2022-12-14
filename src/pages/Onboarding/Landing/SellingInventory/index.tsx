import { IconPlay,MapFlorida } from "@/assets/images";
import SignupButton from "@/components/SignupButton";
import { Col, Row } from "reactstrap";
import styles from "./styles.module.scss";
const SellingInventory = () => {
  return (
    <>
      <h1 className={styles.titleHeading}>Selling Your Retail Inventory</h1>
      <Row>
        <Col lg={6} className={styles.mainSeaction}>
          <div>
            <h2 className={styles.sellingHeading}>More Reach - More Revenue</h2>
            <div className={styles.sellingList}>
              <ul className={styles.bodyList}>
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
            <SignupButton />
            <div className="w-100 d-flex justify-content-center mt-5"></div>
          </div>
        </Col>
        <Col lg={6} className={styles.mapSection}>
          <img src={IconPlay} className={styles.video} alt="" />
          <img src={MapFlorida} alt="Map Florida" className={styles.mapImg} />
        </Col>
      </Row>
    </>
  );
};
export default SellingInventory;

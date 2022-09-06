import { IconPlay, WholeSolutionImage } from "@/assets/images";
import SignupButton from "@/components/SignupButton";
import { Col, Row } from "reactstrap";
import styles from "./styles.module.scss";

const WholesaleSolution = () => {
  return (
    <>
      <div className={styles.wholesaleContainer}>
        <h1 className={styles.titleHeading}>Wholesale Solutions</h1>
      </div>
      <Row xs="2">
        <Col xs={12} md={12} lg={6} className={styles.vehicleBodySeaction}>
          <div>
            <h2 className={styles.sellingHeading}>When You Need More...</h2>
            <div className={styles.sellingList}>
              <ul className={styles.bodyList}>
                <li>Source Dealers Inventory Nationwide</li>
                <li>Dealer to Dealer Live Online</li>
                <li>Have Cars Shipped Directly To Your Dearlership</li>
                <li>Never Loose A Customer Again</li>
                <li>Never Go To An Auction Again</li>
              </ul>
            </div>
            <SignupButton />
            <div className="w-100 d-flex  mt-5"></div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} className={styles.wholesaleImgSection}>
          <img src={IconPlay} className={styles.playVideo} alt="Wholesale" />
          <img
            src={WholeSolutionImage}
            alt="simple"
            className={styles.wholesaleImg}
          />
        </Col>
      </Row>
    </>
  );
};
export default WholesaleSolution;

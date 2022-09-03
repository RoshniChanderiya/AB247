import { IconPlay, PrivateVehicleMainImage } from "@/assets/images";
import Button from "@/components/Button";
import { Col, Row } from "reactstrap";
import styles from "./styles.module.scss";
const PrivateVehicle = () => {
  return (
    <>
      <div className={styles.vehicleTitle}>
        <h1 className={styles.textTitle}>Private Vehicle Sourcing</h1>
      </div>
      <div className={styles.vehicleSection}>
        <Row>
          <Col lg={6} className={styles.privateSeaction}>
            <img src={IconPlay} className={styles.videoPlay} alt="" />
            <img
              src={PrivateVehicleMainImage}
              alt="simple"
              className={styles.privateVehicleImg}
            />
          </Col>
          <Col lg={6} className={styles.vehicleBodySeaction}>
            <div>
              <h2 className={styles.sellingHeading}>Now You Can...</h2>
              <div className={styles.sellingList}>
                <ul className={styles.bodyList}>
                  <li>Buy Cars Direct from Consumers</li>
                  <li>Increase Your Vehicle Inventory</li>
                  <li>Get Access to Vehicles You Would Never See</li>
                  <li>Have Cars Shipped Directly To Your Dearlership</li>
                  <li>$250 Fixed Buy Fee on Every Vehicle</li>
                </ul>
              </div>
              <div className={styles.footerBtn}>
                <Button>ONE SIGN UP - GET ALL 3</Button>
              </div>
              <div className="w-100 d-flex  mt-5"></div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default PrivateVehicle;

import Button from "@/components/Button";
import styles from "./styles.module.scss";
import { Col, Row } from "reactstrap";
import { IconPlay,PrivateVehicleMainImage} from "@/assets/images";
const PrivateVehicle = () => {
  return (
    <div>
      <div className={styles.vehicleTitle}>
        <h1 className={styles.textTitle}>Private Vehicle Sourcing</h1>
      </div>
      <div className={styles.vehicleSection}>
        <Row>
          <Col lg={6} className={styles.privateSeaction}>
            <img
              src={PrivateVehicleMainImage}
              alt="simple"
              className={styles.privateVehicleImg}
            />
            <img src={IconPlay} alt="" className={styles.videoPlay} />
          </Col>
          <Col lg={6} className={styles.vehicleBodySeaction}>
            <div>
              <h2 className={styles.sellingHeading}>Now You Can...</h2>
              <div className={styles.sellingList}>
                <ul className="mt-5 text-start">
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
    </div>
  );
};
export default PrivateVehicle;

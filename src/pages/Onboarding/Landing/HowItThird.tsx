import { Col, Row } from "reactstrap";
import Button from "@/components/Button";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {  IconNotify, IconSignup,IconAwesomeCar } from "@/assets/images";

const steps = [
  {
    num: "1",
    title: "Sign Up",
    icon: IconSignup,
    point1: "Quick and Easy 2 Minute Process",
    point2: "Enter Banking Information",
    point3: "Enter Floorplan Company",
  },
  {
    num: "2",
    title: "Find a Car From Any Location",
    icon: IconNotify,
    point1: "Find the Exact Car You Need",
    point2: "Make a Deal Online",
    point3: "Add to Your Floorplan",
  },
  {
    num: "3",
    title: "Sell More",
    icon: IconAwesomeCar,
    point1: "We Pick Up and Delivery",
    point2: "Meet Your Buyers Needs", 
    point3: "Never Loose a Customer Again...",
  },
];
const HowItThird = () => {
  return (
    <div className={styles.homeOneContainer}>
    <div className="mt-2">
      <h1 className={styles.h1}>How It Works</h1>
      <Row className="mt-5">
        {steps.map((step) => (
          <Col lg={4} key={step.num}>
            <img src={step.icon} alt="no" className={styles.titleIcons} />
            <h4 className={styles.title}>{step.title}</h4>
            <div className={styles.titleBody}>
              <ul>
                <li className={styles.itemsLists}>{step.point1}</li>
                <li className={styles.itemsLists}>{step.point2}</li>
                <li className={styles.itemsLists}>{step.point3}</li>
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </div>
    <div className={styles.itBtnFooter}>
      <Button
        filled
        className={classNames("ml-5", "btn-save", "h-100", "mt-5")}
      >
        ONE SIGN UP - GET ALL 3
      </Button>
    </div>
  </div>
  );
};
export default HowItThird;

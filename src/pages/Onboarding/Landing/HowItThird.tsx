import React from "react";
import { Col, Row } from "reactstrap";
import Button from "@/components/Button";
import classNames from "classnames";

import styles from "./styles.module.scss";

const steps = [
  {
    num: "1",
    title: "Sign Up",
    point1: "Quick and Easy 2 Minute Process",
    point2: "Enter Banking Information",
    point3: "Enter Floorplan Company",
  },
  {
    num: "2",
    title: "Find a Car From Any Location",
    point1: "Find the Exact Car You Need",
    point2: "Make a Deal Online",
    point3: "Add to Your Floorplan",
  },
  {
    num: "3",
    title: "Sell More",
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
            <Col lg={4} key={step.num} className="ps-5 pe-5 mt-5">
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
        <Button filled className={classNames("ml-5", "btn-save", "h-100", "mt-5")}>
          ONE SIGN UP - GET ALL 3
        </Button>
      </div>
    </div>
  );
};
export default HowItThird;

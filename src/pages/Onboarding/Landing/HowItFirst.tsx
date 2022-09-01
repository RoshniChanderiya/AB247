import React from "react";
import { Col, Row } from "reactstrap";
import Button from "@/components/Button";
import classNames from "classnames";
import { IconBid, IconSignup, IconNotify } from "@/assets/images";

import styles from "./styles.module.scss";

const steps = [
  {
    num: "1",
    title: "Sign Up",
    icon: IconSignup,
    point1: "Quick and Easy 2 Minute Process",
    point2: "Mobile or Desktop Access",
    point3: "Secure Data Encryption",
  },
  {
    num: "2",
    title: "We Notify You",
    icon: IconNotify,
    point1: "When you Inventory is Selected",
    point2: "When a Pre-Qualifiled Buyer Has Selected Your Car",
    point3: "When a Customer Schedules an Auction",
  },
  {
    num: "3",
    title: "Bid & Buy",
    icon: IconBid,
    point1: "View the Customer Profile",
    point2: "See Your Backend Profile",
    point3: "You know the Drill...",
  },
];
const HowItFirst = () => {
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
export default HowItFirst;

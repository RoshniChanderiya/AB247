import React from "react";
import { Col, Row } from "reactstrap";
import Button from "@/components/Button";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { IconBid, IconNotify, IconSignup } from "@/assets/images";

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
    title: "Tell Us What You Buy",
    icon: IconNotify,

    point1: "Set Your Preferences",
    point2: "Review Available Auction Inventory",
    point3: "Add Inventory to Watch List",
  },
  {
    num: "3",
    title: "Bid and Buy",
    icon: IconBid,

    point1: "Receive Your Auction Alerts",
    point2: "Enter The Live Online Auction",
    point3: "Bid and Buy...",
  },
];
const HowItSecond = () => {
  return (
    <div className={styles.homeContainer}>
      <div className="mt-2">
        <h1>How It Works</h1>
        <Row>
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
export default HowItSecond;

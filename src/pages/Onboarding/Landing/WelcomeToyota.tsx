import React from "react";
import classNames from "classnames";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import Button from "@/components/Button";

import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  SellRetailInvetory,
  WholesaleSolution,
  PrivateVehicleCard,
  PrivateVehicleSourcing,
  cardImage,
} from "@/assets/images";
const WelcomeToyota = () => {
  const cardData = [
    {
      num: "1",
      title: "Sell Retail Inventory ",
      imgs: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",

      point1: "We Deliver DEALS, Not Leads",
      point2: "Sell Your Invetory 24 Hours a Day",
      point3: "No Salesman to Pay",
      point4: "No Listing Fees",
      point5: "Cloud Based Inventory Management Tool",
      point6: "Search to Signature",
      action: "Learn More",
    },
    {
      num: "2",
      title: "Private Vehicle Sourcing",
      imgs: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      point1: "Buy Cars Direct from Consumers ",
      point2: "Increase Your Vehicle Inventory",
      point3: "Get Access to Vehicles You Would Never See ",
      point4: "Have Cars Shipped Directly to Your Dealership",
      point5: "$250 Fixed Buy Fee on Every Vehicle",
      point6: "Winning at the Crub",
      action: "Learn More",
    },
    {
      num: "3",
      title: "Wholesale Solutions",
      imgs: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      point1: "Never Lose a Customer Again",
      point2: "Search All Dealer Inventory Nationwide",
      point3: "Fast Online Transaction",
      point4: "Have Cars Shipped Directly to Your Dealership",
      point5: "Mobile and Desktop Solutions",
      point6: "It's a No Brainer",
      action: "Learn More",
    },
  ];
  return (
    <div>
      <div className={styles.textTitle}>
        <h1>Welcome Avery Toyota</h1>
        <h3 className={styles.subHeading}>
          To The Future of Buying and Selling Cars!
        </h3>
      </div>

      <div className={styles.cardSection}>
        <Container>
          <Row>
            {cardData.map((element) => {
              return (
                <>
                  <Col lg={4} key={element.num}>
                    <div className={styles.cardMenu}>
                      <Card>
                        <img
                          alt="Sample"
                          src={element.imgs}
                          className={styles.cardImg}
                        />

                        <CardBody className={styles.cardBody}>
                          <ul>
                            <CardTitle tag="h5" className={styles.titleSection}>
                              {element.title}
                            </CardTitle>
                            <li className={styles.listSection}>
                              {element.point1}
                            </li>
                            <li className={styles.listSection}>
                              {element.point2}
                            </li>
                            <li className={styles.listSection}>
                              {element.point3}
                            </li>
                            <li className={styles.listSection}>
                              {element.point4}
                            </li>
                            <li className={styles.listSection}>
                              {element.point5}
                            </li>
                          </ul>
                          <h4 className={styles.titleSection}>
                            {element.point6}
                          </h4>
                          <h6 className={styles.actionLink}>
                            <Link to="">{element.action}</Link>
                          </h6>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
        <div className={styles.btnFooter}>
          <Button filled className={classNames("ml-5", "btn-save", "h-100")}>
            ONE SIGN UP - GET ALL 3
          </Button>
        </div>
      </div>
    </div>
  );
};
export default WelcomeToyota;

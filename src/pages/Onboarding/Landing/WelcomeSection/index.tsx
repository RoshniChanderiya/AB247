import {
  PrivateVehicleCars,
  SellInventory,
  WholeSolutions
} from "@/assets/images";
import SignupButton from "@/components/SignupButton";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import styles from "./styles.module.scss";
const WelcomeSection = () => {
  const cardData = [
    {
      id: "1",
      title: "Sell Retail Inventory ",
      imgs: SellInventory,
      description: [
        "We Deliver DEALS, Not Leads",
        "Sell Your Invetory 24 Hours a Day",
        "No Salesman to Pay",
        "No Listing Fees",
        "Cloud Based Inventory Management Tool",
      ],
      point1: "Search to Signature",
      action: "Learn More",
    },
    {
      id: "2",
      title: "Private Vehicle Sourcing",
      imgs: PrivateVehicleCars,
      description: [
        "Buy Cars Direct from Consumers ",
        "Increase Your Vehicle Inventory",
        "Get Access to Vehicles You Would Never See ",
        "Have Cars Shipped Directly to Your Dealership",
        "$250 Fixed Buy Fee on Every Vehicle",
      ],

      point1: "Winning at the Crub",
      action: "Learn More",
    },
    {
      id: "3",
      title: "Wholesale Solutions",
      imgs: WholeSolutions,
      description: [
        "Never Lose a Customer Again",
        "Search All Dealer Inventory Nationwide",
        "Fast Online Transaction",
        "Have Cars Shipped Directly to Your Dealership",
        "Mobile and Desktop Solutions",
      ],
      point1: "It's a No Brainer",
      action: "Learn More",
    },
  ];
  return (
    <>
      <div className={styles.textTitle}>
        <h1 className={styles.titleHeading}>Welcome Avery Toyota</h1>
        <h3 className={styles.subHeading}>
          To The Future of Buying and Selling Cars!
        </h3>
      </div>
      <div className={styles.cardSection}>
        <Container>
          <Row>
            {cardData.map((element) => {
              return (
                  <Col lg={4} key={element.id}>
                    <div className={styles.cardMenu}>
                      <Card>
                        <img
                          alt="Vehicle"
                          src={element.imgs}
                          className={styles.cardImg}
                        />

                        <CardBody className={styles.cardBody}>
                          <ul>
                            <CardTitle tag="h5" className={styles.titleSection}>
                              {element.title}
                            </CardTitle>

                            {element.description.map((step) => (
                              <li key={step} className={styles.listSection}>
                                {step}
                              </li>
                            ))}
                          </ul>
                          <h4 className={styles.titleSection}>
                            {element.point1}
                          </h4>
                          <h6 className={styles.actionLink}>
                            <Link to="">{element.action}</Link>
                          </h6>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
              );
            })}
          </Row>
        </Container>
        <SignupButton />
      </div>
    </>
  );
};
export default WelcomeSection;

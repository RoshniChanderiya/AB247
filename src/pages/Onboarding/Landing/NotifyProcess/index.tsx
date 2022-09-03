import { BidIcon, NotifyIcon, SignupIcon } from "@/assets/images";
import Button from "@/components/Button";
import classNames from "classnames";
import { Col, Row } from "reactstrap";
import styles from "./styles.module.scss";

const steps = [
  {
    id: "1",
    title: "Sign Up",
    icon: SignupIcon,
    description: [
      "Quick and Easy 2 Minute Process",
      "Quick and Easy 2 Minute Process",
      "Secure Data Encryption",
    ],
  },
  {
    id: "2",
    title: "We Notify You",
    icon: NotifyIcon,
    description: [
      "When you Inventory is Selected",
      "When a Pre-Qualifiled Buyer Has Selected Your Car",
      "When a Customer Schedules an Auction",
    ],
  },
  {
    id: "3",
    title: "Bid & Buy",
    icon: BidIcon,
    description: [
      "View the Customer Profile",
      "See Your Backend Profile",
      "You know the Drill...",
    ],
  },
];
const NotifyProcess = () => {
  return (
    <div className={styles.homeOneContainer}>
      <div className="mt-2">
        <h1 className={styles.h1}>How It Works</h1>
        <Row className="mt-5">
          {steps.map((step) => (
            <Col lg={4} key={step.id}>
              <img src={step.icon} alt="no" className={styles.titleIcons} />
              <h4 className={styles.title}>{step.title}</h4>
              <div className={styles.titleBody}>
                <ul className={styles.bodyList}>
                  {step.description.map((element) => (
                    <li key={element} className={styles.itemsLists}>
                      {element}
                    </li>
                  ))}
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
export default NotifyProcess;

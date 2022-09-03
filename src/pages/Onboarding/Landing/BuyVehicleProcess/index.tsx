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
      "Mobile or Desktop Access",
      "Secure Data Encryption",
    ],
  },
  {
    id: "2",
    title: "Tell Us What You Buy",
    icon: NotifyIcon,
    description: [
      "Set Your Preferences",
      "Review Available Auction Inventory",
      "Add Inventory to Watch List",
    ],
  },
  {
    id: "3",
    title: "Bid and Buy",
    icon: BidIcon,
    description: [
      "Receive Your Auction Alerts",
      "Enter The Live Online Auction",
      "Bid and Buy...",
    ],
  },
];
const BuyVehicleProcess = () => {
  return (
    <div className={styles.homeContainer}>
      <div className="mt-2">
        <h1>How It Works</h1>
        <Row>
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
export default BuyVehicleProcess;

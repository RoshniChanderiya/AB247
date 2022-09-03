import { NotifyIcon, SellCarIcon, SignupIcon } from "@/assets/images";
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
      "Enter Banking Information",
      "Enter Floorplan Company",
    ],
  },
  {
    id: "2",
    title: "Find a Car From Any Location",
    icon: NotifyIcon,
    description: [
      "Find the Exact Car You Need",
      "Make a Deal Online",
      "Add to Your Floorplan",
    ],
  },
  {
    id: "3",
    title: "Sell More",
    icon: SellCarIcon,
    description: [
      "We Pick Up and Delivery",
      "Meet Your Buyers Needs",
      "Never Loose a Customer Again...",
    ],
  },
];
const FindVehicleProcess = () => {
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
export default FindVehicleProcess;

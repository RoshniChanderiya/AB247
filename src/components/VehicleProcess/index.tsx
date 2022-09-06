import SignupButton from "@/components/SignupButton";
import React from "react";
import { Col, Row } from "reactstrap";
import styles from "./styles.module.scss";

export interface VehicleProcessDataProps {
  id?: string;
  title: string;
  icon?: string;
  description: string[];
}

interface VehicleProcessProps {
  processData: VehicleProcessDataProps[];
}

const VehicleProcess: React.FC<VehicleProcessProps> = ({ processData }) => {
  return (
    <div className={styles.homeOneContainer}>
      <div className="mt-2">
        <h1 className={styles.notifyheading}>How It Works</h1>
        <Row className="mt-5">
          {processData.map((step) => (
            <Col lg={4} key={step.id}>
              <img
                src={step.icon}
                alt="Process"
                className={styles.titleIcons}
              />
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
      <SignupButton />
    </div>
  );
};
export default VehicleProcess;

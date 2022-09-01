import Sidebar from "@/components/Sidebar";
import SummarySidebar from "@/pages/Onboarding/SummarySidebar";
import classNames from "classnames";
import { find, findIndex } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import AccountDetails from "./Forms/AccountDetails";
import BusinessDetails from "./Forms/BusinessDetails";
import Representatives from "./Forms/Representatives";
import Summary from "./Forms/Summary";
import styles from "./styles.module.scss";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("BUSINESS_DETAILS");
  const [sidebarOptions, setSidebarOptions] = useState([
    {
      completed: true,
      enabled: true,
      active: true,
      title: "Business Details",
      subtitle: "About 1 minute",
      property: "BUSINESS_DETAILS",
      path: "/business",
      onClick: () => handleStepItemClick("BUSINESS_DETAILS"),
    },
    {
      completed: false,
      enabled: false,
      active: false,
      title: "Account Details",
      subtitle: "About 1 minute",
      property: "DEALER_BILLING_COSTS",
      requires: ["BUSINESS_DETAILS"],
      path: "/account",
      onClick: () => handleStepItemClick("DEALER_BILLING_COSTS"),
    },
    {
      completed: false,
      enabled: false,
      active: false,
      title: "Add Dealer Representatives",
      subtitle: "About 4 minute",
      property: "DEALER_REPRESENTATIVES",
      requires: ["BUSINESS_DETAILS", "DEALER_BILLING_COSTS"],
      path: "/representative",
      onClick: () => handleStepItemClick("DEALER_REPRESENTATIVES"),
    },
  ]);
  const handleStepItemClick = (property: any) => {
    setSidebarOptions((sidebarOptions) =>
      sidebarOptions.map((step) => {
        if (step.property === property) {
          return {
            ...step,
            active: true,
            completed: true,
          };
        } else {
          return { ...step, active: false };
        }
      })
    );
    const path = find(sidebarOptions, { property })?.path || "";
    setActiveStep(property);
    navigate(`/onboarding${path}`);
  };
  const handleNextStepClick = () => {
    const stepIndex = findIndex(sidebarOptions, function (step: any) {
      return step.property === activeStep;
    });
    if (stepIndex === sidebarOptions.length - 1) {
      setActiveStep("DEALER_SUMMARY");
      return;
    }

    const property = sidebarOptions[stepIndex + 1].property;
    setActiveStep(property);
    setSidebarOptions((sidebarOptions) =>
      sidebarOptions.map((step) => {
        if (step.property === property) {
          return {
            ...step,
            active: true,
            completed: true,
            enabled: true,
          };
        } else {
          return { ...step, active: false };
        }
      })
    );
    navigate(`/onboarding${sidebarOptions[stepIndex + 1].path}`);
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col lg={9}>
          <Card className={classNames(styles.contactForm, "p-3")}>
            {activeStep === "BUSINESS_DETAILS" && (
              <BusinessDetails handleNextStepClick={handleNextStepClick} />
            )}
            {activeStep === "DEALER_BILLING_COSTS" && (
              <AccountDetails handleNextStepClick={handleNextStepClick} />
            )}
            {activeStep === "DEALER_REPRESENTATIVES" && (
              <Representatives handleNextStepClick={handleNextStepClick} />
            )}
            {activeStep === "DEALER_SUMMARY" && <Summary />}
          </Card>
        </Col>
        <Col lg={3}>
          {activeStep === "DEALER_SUMMARY" ? (
            <SummarySidebar handleStepItemClick={handleStepItemClick} />
          ) : (
            <Sidebar
              title="Dealer Profile Registration"
              activeStep={activeStep}
              items={sidebarOptions}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Onboarding;

import Button from "@/components/Button";
import useAuth from "@/hooks/useAuth";
import OnboardingProvider from "@/providers/OnboardingProvider";
import classNames from "classnames";
import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import Summary from "./Summary";
import SummarySidebar from "./SummarySidebar";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const mobResponsiveToggle = () => {
    setIsOpen((prev) => !prev);
  };

  let width = window.innerWidth;
  return (
    <OnboardingProvider id={user?.dealer?.id}>
      {width > 568 ? (
        <Row>
          <Col lg={9}>
            <Card className={classNames("styles.contactForm", "p-3")}>
              <Summary />
            </Card>
          </Col>
          <Col lg={3}>
            <SummarySidebar />
          </Col>
        </Row>
      ) : (
        <Row>
          {isOpen ? (
            <Col lg={9}>
              <Card className={classNames("styles.contactForm", "p-3")}>
                <Summary />
                <Button onClick={mobResponsiveToggle}>VIEW DEARLERSHIP</Button>
              </Card>
            </Col>
          ) : (
            <Col lg={3}>
              <SummarySidebar />
            </Col>
          )}
        </Row>
      )}
    </OnboardingProvider>
  );
};

export default Profile;

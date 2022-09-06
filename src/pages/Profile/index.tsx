import useAuth from "@/hooks/useAuth";
import OnboardingProvider from "@/providers/OnboardingProvider";
import classNames from "classnames";
import React from "react";
import { Card, Col, Row } from "reactstrap";
import Summary from "./Summary";
import SummarySidebar from "./SummarySidebar";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <OnboardingProvider id={user?.dealer?.id}>
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
    </OnboardingProvider>
  );
};

export default Profile;

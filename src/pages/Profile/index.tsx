import Button from "@/components/Button";
import useAuth from "@/hooks/useAuth";
import useWindowDimentions from "@/hooks/useWindowDimensions";
import OnboardingProvider from "@/providers/OnboardingProvider";
import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import Summary from "./Summary";
import SummarySidebar from "./SummarySidebar";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { isMobile } = useWindowDimentions();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpenState = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <OnboardingProvider id={user?.dealer?.id}>
      <Row>
        <Col lg={9}>
          <Card className="p-3">
            {isOpen || !isMobile ? (
              <>
                <Summary />
                {isMobile && (
                  <Button onClick={toggleOpenState}>VIEW DEARLERSHIP</Button>
                )}
              </>
            ) : (
              <SummarySidebar />
            )}
          </Card>
        </Col>
        <Col lg={3}>{!isMobile && <SummarySidebar />}</Col>
      </Row>
    </OnboardingProvider>
  );
};

export default Profile;

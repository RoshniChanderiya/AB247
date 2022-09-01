import Button from "@/components/Button";
import Form from "@/components/Form";
import ThemeInput from "@/components/ThemeInput";
import classNames from "classnames";
import React from "react";
import { Col, Row } from "reactstrap";
import ContactNumberFooter from "../ContactNumberFooter";
import styles from "./styles.module.scss";

interface handleNextStepClickData {
  handleNextStepClick: () => void;
}
const BusinessDetails: React.FC<handleNextStepClickData> = ({
  handleNextStepClick,
}) => {
  const onSubmit = () => {
    handleNextStepClick();
  };
  return (
    <>
      <Form initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <Col sm={12}>
              <span className={styles.heading}>Business Details</span>
            </Col>
            <Col sm={12} className="mt-4">
              <ThemeInput
                variant="default"
                control="themed"
                name="dealershipBussinessName"
                showRequiredMark
                label="Dealership Business Name"
                placeholder="Enter Dealership Business Name"
              />
            </Col>
            <Col sm={12}>
              <ThemeInput
                variant="default"
                control="themed"
                name="website"
                showRequiredMark
                label="Website"
                placeholder="Enter Website URL"
              />
            </Col>
            <Col sm={12}>
              <ThemeInput
                variant="default"
                control="themed"
                name="companyEmailAddress"
                showRequiredMark
                label="Company Email Address"
                placeholder="Enter Company Email Address"
              />
            </Col>
            <Col sm={12}>
              <ThemeInput
                variant="default"
                control="themed"
                name="Phone"
                showRequiredMark
                label="Phone"
                placeholder="Enter Office Phone"
              />
            </Col>
            <Col sm={12}>
              <ThemeInput
                variant="default"
                control="themed"
                name="addressline1"
                showRequiredMark
                label="Address Line 1"
                placeholder="Address Line 1"
              />
            </Col>
            <Col sm={12}>
              <ThemeInput
                variant="default"
                control="themed"
                name="addressline2"
                label="Address Line 2"
                placeholder="Address Line 2"
              />
            </Col>
            <Row>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  control="themed"
                  name="city"
                  showRequiredMark
                  label="City"
                  placeholder="Enter City"
                />
              </Col>
              <Col sm={12} lg={8}>
                <ThemeInput
                  type="select"
                  label="State"
                  placeholder="Select State"
                  showRequiredMark
                  variant="default"
                />
              </Col>
              <Col sm={12} lg={4}>
                <ThemeInput
                  variant="default"
                  control="themed"
                  name="zipCode"
                  showRequiredMark
                  label="Zip Code"
                  placeholder="Enter Zip Code"
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Col sm={12}>
              <span className={styles.heading}>
                Account Administrator Information
              </span>
            </Col>
            <Row className="mt-4">
              <Col sm={6}>
                <ThemeInput
                  variant="default"
                  control="themed"
                  name="firstName"
                  showRequiredMark
                  label="First Name"
                  placeholder="Enter First Name"
                />
              </Col>
              <Col sm={6}>
                <ThemeInput
                  variant="default"
                  control="themed"
                  name="lastName"
                  showRequiredMark
                  label="Last Name"
                  placeholder="Enter Last Name"
                />
              </Col>
              <Col sm={12}>
                <ThemeInput
                  type="select"
                  label="Business Tittle/ Administrator"
                  placeholder="General Manager/ Administrator"
                  showRequiredMark
                  variant="default"
                  createable
                />
              </Col>
              <Col sm={12}>
                <ThemeInput
                  variant="default"
                  control="themed"
                  name="email"
                  showRequiredMark
                  label="Your Email Address"
                  placeholder="Enter Your Email Address"
                />
              </Col>
              <Row>
                <Col sm={5}>
                  <ThemeInput
                    variant="default"
                    control="themed"
                    name="directPhone"
                    showRequiredMark
                    label="Your Direct Phone"
                    placeholder="Enter Your Mobile Phone Number"
                  />
                </Col>
                <Col sm={2}>
                  <ThemeInput
                    variant="default"
                    control="themed"
                    name="ext"
                    label="Ext."
                    placeholder="Ext."
                  />
                </Col>
                <Col sm={5}>
                  <ThemeInput
                    variant="default"
                    control="themed"
                    name="mobileNumber"
                    showRequiredMark
                    label="Your Mobile Number"
                    placeholder="Enter Your Mobile Number"
                  />
                </Col>
              </Row>
              <Col sm={12} className="mx-3">
                <Button
                  filled
                  type="submit"
                  className={classNames(styles.nextbtn, "w-25", "btn-save")}
                >
                  NEXT STEP
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <ContactNumberFooter />
    </>
  );
};

export default BusinessDetails;

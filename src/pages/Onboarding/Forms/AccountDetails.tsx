import Button from "@/components/Button";
import Form from "@/components/Form";
import ThemeCheckBox from "@/components/ThemeCheckBox";
import ThemeInput from "@/components/ThemeInput";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ContactNumberFooter from "../ContactNumberFooter";
import styles from "./styles.module.scss";

interface AccountDetailData {
  handleNextStepClick: () => void;
}
const AccountDetails: React.FC<AccountDetailData> = ({
  handleNextStepClick,
}) => {
  const onSubmit = () => {
    handleNextStepClick();
  };
  return (
    <>
      <Form initialValues={{}} onSubmit={onSubmit}>
        <Row className="px-3">
          <Col sm={12}>
            <span className={styles.heading}>Account Details</span>
          </Col>
        </Row>
        <Row className="mt-3 px-4">
          <Col lg={6} className={styles.dealershipForm}>
            <Col className="mt-3">
              <h5 className={styles.header}>
                Add Dealership Fees and Inventory
              </h5>
            </Col>
            <Row>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="dealerFee"
                  label="Dealer Fee"
                  placeholder="$599"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="titleProcessingFee"
                  label="Title Processing Fee"
                  placeholder="$299"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="addDMSAccountNumber"
                  label="Add DMS Account Number"
                  placeholder="DMS Account Number Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="AddDMSName"
                  label="Add DMS Name"
                  placeholder="Select DMS"
                  type="select"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="addFloorplanCompany"
                  label="Add Floorplan Company"
                  placeholder="Floorplan Company Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <ThemeInput
                  variant="default"
                  showRequiredMark
                  boldLabel
                  control="themed"
                  name="addFloorplanContactEmail"
                  label="Add Floorplan Contact Email"
                  placeholder=" Select Floorplan Contact Email"
                />
              </Col>
              <Col lg={12} className="mt-2">
                <h5 className={styles.header}>Banking Information</h5>
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="bankName"
                  label="Bank Name"
                  placeholder="Enter Bank Name Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="bankName"
                  label="Bank Address"
                  placeholder="Bank Address Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="wireAccountNumber"
                  label="Wire Account Number"
                  placeholder="Wire Account Number"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="wireRoutingNumber"
                  label="Wire Routing Number"
                  placeholder="Wire Routing Number"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="businessName"
                  label="Business Name"
                  placeholder="Enter Business Name Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <ThemeInput
                  variant="default"
                  boldLabel
                  control="themed"
                  name="businessAddress"
                  label="Business Address"
                  placeholder="Business Address Here"
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Col lg={12}>
              <h1 className={styles.informationHeading}>
                <i>Why do we need this information?</i>
              </h1>
            </Col>
            <Col lg={12} className="mt-4 px-5">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When we sell your car we produce a full purchase order including
                your fees.
              </div>
            </Col>
            <Col lg={12} className="mt-2 px-5">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                To ensure your inventory is up-to-date in our platform to allow
                us to sell more of your vehicles.
              </div>
            </Col>
            <Col lg={12} className="mt-2 px-5">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When buying a vehicle from our Wholesale Portal we can email
                your floorplan company a copy of the wholesale purchase order.
              </div>
            </Col>
            <Col lg={12} className="mt-3 px-5">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When selling a car in our Wholesale Portal, the buying dealer
                can wire funds directly to your bank account.
              </div>
            </Col>

            <Col sm={12} className={styles.submitbtn}>
              <Button
                filled
                type="submit"
                size="xl"
                className={classNames("mx-4", "btn-save", "h-100")}
              >
                COMPLETE REGISTRATION
              </Button>
              <div className="d-flex mx-3 mt-3">
                <ThemeCheckBox
                  name={""}
                  label="I agree with the "
                  className="mx-1"
                  color="red"
                />
                <Link to="">
                  <p>Terms and Conditions</p>
                </Link>
              </div>
            </Col>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col lg={12} className="mt-4">
          <ContactNumberFooter />
        </Col>
      </Row>
    </>
  );
};

export default AccountDetails;

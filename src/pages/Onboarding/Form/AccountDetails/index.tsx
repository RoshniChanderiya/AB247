import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Link from "@/components/Link";
import type { ItemProperties } from "@/components/Sidebar";
import ThemeCheckBox from "@/components/ThemeCheckBox";
import { useSaveAccountDetailsMutation } from "@/hooks/dealer";
import ContactNumberFooter from "@/pages/Onboarding/ContactNumberFooter";
import { OnboardingContext } from "@/providers/OnboardingProvider";
import { getSnakeCaseVersion } from "@/utils/generic";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import get from "lodash/get";
import { useContext } from "react";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import styles from "../styles.module.scss";

const accountDetailsSchema = yup.object().shape({
  dealerFees: yup.number().required("Please enter dealer fees."),
  processingFees: yup.number().required("Please enter processing fees."),
  dmsAccountNumber: yup.string().required("Please enter account number."),
  dmsName: yup.string().required("Please select DMS name."),
  floorplanCompany: yup.string().required("Please select floor plan company."),
  floorplanCompanyEmail: yup
    .string()
    .required("Please select floor plan company email.")
    .email("Please enter valid email."),
  bank: yup.object().shape({
    name: yup.string().optional(),
    address: yup.string().optional(),
    accountNumber: yup.string().optional(),
    routingNumber: yup.string().optional(),
    businessName: yup.string().optional(),
    businessAddress: yup.string().optional(),
  }),
});

interface AccountDetailsProps {
  onNext: (key: ItemProperties, data: Record<string, any>) => void;
}
const AccountDetails: React.FC<AccountDetailsProps> = ({ onNext }) => {
  const { dealer } = useContext(OnboardingContext);
  const { isLoading, mutateAsync: saveAccountDetailsMutation } =
    useSaveAccountDetailsMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      const data = getSnakeCaseVersion(values);
      await saveAccountDetailsMutation({
        id: dealer?._id as string,
        data,
      });
      onNext("DEALER_BILLING_COSTS", getSnakeCaseVersion(values));
      Message.success("Account details saved successfully.");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  const dealerPayload = get(dealer, "_source.payload", {});
  return (
    <>
      <Form
        initialValues={{
          dealerFees: dealerPayload.dealer_fees || "",
          processingFees: dealerPayload.processing_fees || "",
          dmsAccountNumber: dealerPayload.dms_account_number || "",
          dmsName: dealerPayload.dms_name || "",
          floorplanCompany: dealerPayload.floorplan_company || "",
          floorplanCompanyEmail: dealerPayload.floorplan_company_email || "",
          bank: {
            name: dealerPayload.bank?.name || "",
            address: dealerPayload.bank?.address || "",
            accountNumber: dealerPayload.bank?.account_number || "",
            routingNumber: dealerPayload.bank?.routing_number || "",
            businessName: dealerPayload.bank?.business_name || "",
            businessAddress: dealerPayload.bank?.business_address || "",
          },
        }}
        onSubmit={onSubmit}
        validationSchema={accountDetailsSchema}
      >
        <Row className="px-0 px-sm-3">
          <Col sm={12}>
            <span className={styles.heading}>Account Details</span>
          </Col>
        </Row>
        <Row className="mt-3 mt-sm-3 px-0 px-sm-4">
          <Col lg={6} sm={12} xs={12} className={styles.dealershipForm}>
            <Col className="mt-5 mt-sm-3">
              <h5 className={styles.header}>
                Add Dealership Fees and Inventory
              </h5>
            </Col>
            <Row className="p-3">
              <Col sm={12} xs={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="dealerFees"
                  label="Dealer Fee"
                  placeholder="$599"
                  type="currency"
                />
              </Col>
              <Col xs={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="processingFees"
                  label="Total Processing Fee"
                  placeholder="$299"
                  type="currency"
                />
              </Col>
              <Col xs={12} lg={6} className="mt-3">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="dmsAccountNumber"
                  label="Add DMS Account Number"
                  placeholder="DMS Account Number Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="dmsName"
                  label="Add DMS Name"
                  placeholder="Select DMS"
                  type="select"
                  options={["Option1", "Option2", "Option3"].map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              </Col>
              <div className="d-flex d-block d-sm-none mt-3 inputTerm">
                <ThemeCheckBox
                  name="terms"
                  label="I agree to allow BidWizer to add my inventory."
                  className="inputcheck"
                  color="red"
                />
              </div>
              <Col sm={12} lg={6} className="mt-3">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="floorplanCompany"
                  label="Add Floorplan Company"
                  placeholder="Floorplan Company Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-3">
                <Input
                  variant="teriary"
                  showRequiredMark
                  name="floorplanCompanyEmail"
                  label="Add Floorplan Contact Email"
                  placeholder=" Select Floorplan Contact Email"
                />
              </Col>
            </Row>
            <Row className={styles.bankingResponsive}>
              <Col lg={12} className="mt-2">
                <h5 className={styles.header}>Banking Information</h5>
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.name"
                  label="Bank Name"
                  placeholder="Enter Bank Name Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.address"
                  label="Bank Address"
                  placeholder="Bank Address Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.accountNumber"
                  label="Wire Account Number"
                  placeholder="Wire Account Number"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.routingNumber"
                  label="Wire Routing Number"
                  placeholder="Wire Routing Number"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.businessName"
                  label="Business Name"
                  placeholder="Enter Business Name Here"
                />
              </Col>
              <Col sm={12} lg={6} className="mt-1">
                <Input
                  variant="teriary"
                  name="bank.businessAddress"
                  label="Business Address"
                  placeholder="Business Address Here"
                />
              </Col>
              <div className="d-flex d-block d-sm-none mt-3 inputTerm">
                <ThemeCheckBox
                  name="terms"
                  label="I agree with the "
                  className="inputcheck"
                  color="red"
                />
                <Link to="/">
                  <p>Terms and Conditions</p>
                </Link>
              </div>
              </Row>
          </Col>
          <Col lg={6} className="p-0">
            <Col lg={12} className="d-none d-sm-block">
              <h1 className={styles.informationHeading}>
                <i>Why do we need this information?</i>
              </h1>
            </Col>
            <Col lg={12} className="mt-4 px-5 d-none d-sm-block">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When we sell your car we produce a full purchase order including
                your fees.
              </div>
            </Col>
            <Col lg={12} className="mt-2 px-5 d-none d-sm-block">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                To ensure your inventory is up-to-date in our platform to allow
                us to sell more of your vehicles.
              </div>
            </Col>
            <Col lg={12} className="mt-2 px-5 d-none d-sm-block">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When buying a vehicle from our Wholesale Portal we can email
                your floorplan company a copy of the wholesale purchase order.
              </div>
            </Col>
            <Col lg={12} className="mt-3 px-5 d-none d-sm-block">
              <div className={classNames(styles.talkbubble, styles.chat)}>
                When selling a car in our Wholesale Portal, the buying dealer
                can wire funds directly to your bank account.
              </div>
            </Col>

            <Col sm={12} className={styles.submitbtn}>
              <Button
                type="submit"
                size="lg"
                className="mx-4 btn-save h-100"
                isLoading={isLoading}
                loaderSize="sm"
              >
                COMPLETE REGISTRATION
              </Button>
              <div className="d-flex mx-3 mt-3 d-none d-sm-block inputTerm">
                <ThemeCheckBox
                  name="terms"
                  label=" I agree with the"
                  className="inputcheck"
                  color="red"
                />
                <Link to="/">
                  <p>Terms and Conditions</p>
                </Link>
              </div>
            </Col>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col lg={12} className={styles.footerBtn}>
          <ContactNumberFooter />
        </Col>
      </Row>
    </>
  );
};

export default AccountDetails;

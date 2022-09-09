import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Radio from "@/components/Radio";
import { ItemProperties } from "@/components/Sidebar";
import { AVAIALABLE_ROLES, States } from "@/constants";
import { useSaveBusinessDetailsMutation } from "@/hooks/dealer";
import { OnboardingContext } from "@/providers/OnboardingProvider";
import { getSnakeCaseVersion } from "@/utils/generic";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import get from "lodash/get";
import React, { useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import ContactNumberFooter from "../../ContactNumberFooter";
import styles from "../styles.module.scss";

const URL_REGEX =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const validationSchema = yup.object({
  dealerName: yup.string().required("Please enter name."),
  dealerUrl: yup
    .string()
    .required("Please enter URL.")
    .matches(URL_REGEX, "Please enter valid URL."),
  dealerEmail: yup
    .string()
    .required("Please enter email.")
    .email("Please enter valid email."),
  dealerPhone: yup.string().required("Please enter phone."),
  dealerStreet: yup.string().required("Please enter address line 1."),
  dealerCity: yup.string().required("Please enter city."),
  dealerState: yup.string().required("Please select state."),
  dealerZipcode: yup
    .string()
    .required("Please enter zipcode.")
    .length(5, "Please enter valid zipcode."),
  admin: yup
    .object()
    .required()
    .shape({
      firstName: yup.string().required("Please enter first name."),
      lastName: yup.string().required("Please enter last name."),
      title: yup.string().required("Please enter title."),
      email: yup
        .string()
        .required("Please enter email.")
        .email("Please enter valid email."),
      phone: yup.string().required("Please enter phone number."),
      mobile: yup.string().required("Please enter mobile number."),
    }),
});

interface BusinessDetailsProps {
  onNext: (key: ItemProperties, data: Record<string, any>) => void;
}
const BusinessDetails: React.FC<BusinessDetailsProps> = ({ onNext }) => {
  const { dealer, admin } = useContext(OnboardingContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const { isLoading, mutateAsync: saveBusinessDetailsMutation } =
    useSaveBusinessDetailsMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      const data = getSnakeCaseVersion(values);
      await saveBusinessDetailsMutation({
        id: dealer?._id as string,
        data,
      });
      onNext("BUSINESS_DETAILS", getSnakeCaseVersion(values));
      Message.success("Business details saved successfully.");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const dealerPayload = get(dealer, "_source.payload", {});
  const adminPayload = get(admin, "_source.payload", {});
  console.log(adminPayload.title);

  return (
    <>
      <Row>
        <Col xs={5}>
          <Radio name={""} label="Bussiness Details" />
        </Col>
        <Col>
          <Radio name={""} label="Add Dealer Representatives" />
        </Col>
      </Row>
      <Form
        initialValues={{
          dealerName: dealerPayload.dealer_name,
          dealerUrl: dealerPayload.dealer_url,
          dealerEmail: dealerPayload.dealer_email,
          dealerPhone: dealerPayload.dealer_phone,
          dealerStreet: dealerPayload.dealer_street,
          addressLine2: dealerPayload.address_line_2,
          dealerCity: dealerPayload.dealer_city,
          dealerState: dealerPayload.dealer_state,
          dealerZipcode: dealerPayload.dealer_zipcode,
          admin: {
            firstName: adminPayload.first_name || "",
            lastName: adminPayload.last_name || "",
            email: adminPayload.email || "",
            title: adminPayload.title || "",
            phone: adminPayload.phone || "",
            mobile: adminPayload.mobile || "",
            extension: adminPayload.extension || "",
          },
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Row>
          <Col sm={12} md={6} lg={6} xs={12}>
            <Col sm={12}>
              <span className={styles.heading}>Business Details</span>
            </Col>
            <Col sm={12} className="mt-4">
              <Input
                variant="teriary"
                name="dealerName"
                showRequiredMark
                label="Dealership Business Name"
                placeholder="Enter Dealership Business Name"
              />
            </Col>
            <Col sm={12}>
              <Input
                variant="teriary"
                name="dealerUrl"
                showRequiredMark
                label="Website"
                placeholder="Enter Website URL"
              />
            </Col>
            <Col sm={12}>
              <Input
                variant="teriary"
                name="dealerEmail"
                showRequiredMark
                label="Company Email Address"
                placeholder="Enter Company Email Address"
              />
            </Col>
            <Col sm={12}>
              <Input
                variant="teriary"
                name="dealerPhone"
                showRequiredMark
                label="Phone"
                type="phone"
                placeholder="Enter Office Phone"
              />
            </Col>
            <Col sm={12}>
              <Input
                variant="teriary"
                name="dealerStreet"
                showRequiredMark
                label="Address Line 1"
                placeholder="Address Line 1"
              />
            </Col>
            <Col sm={12}>
              <Input
                variant="teriary"
                name="addressLine2"
                label="Address Line 2"
                placeholder="Address Line 2"
              />
            </Col>
            <Row>
              <Col sm={12}>
                <Input
                  variant="teriary"
                  name="dealerCity"
                  showRequiredMark
                  label="City"
                  placeholder="Enter City"
                />
              </Col>
              <Col sm={12} lg={8} xs={6}>
                <Input
                  name="dealerState"
                  type="select"
                  label="State"
                  placeholder="Select State"
                  showRequiredMark
                  variant="teriary"
                  options={States.map((state) => ({
                    label: state.name,
                    value: state.abbreviation,
                  }))}
                />
              </Col>
              <Col sm={12} lg={4} xs={6}>
                <Input
                  variant="teriary"
                  name="dealerZipcode"
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
                <Input
                  variant="teriary"
                  name="admin.firstName"
                  showRequiredMark
                  label="First Name"
                  placeholder="Enter First Name"
                />
              </Col>
              <Col sm={6}>
                <Input
                  variant="teriary"
                  name="admin.lastName"
                  showRequiredMark
                  label="Last Name"
                  placeholder="Enter Last Name"
                />
              </Col>
              <Col sm={12} className="d-none d-sm-block">
                <Input
                  name="admin.title"
                  type="select"
                  label="Business Tittle/ Administrator"
                  placeholder="Business Title"
                  showRequiredMark
                  variant="teriary"
                  options={AVAIALABLE_ROLES}
                />
              </Col>
              <Col sm={12} className="d-none d-sm-block">
                <Input
                  variant="teriary"
                  name="admin.email"
                  showRequiredMark
                  label="Your Email Address"
                  placeholder="Enter Your Email Address"
                />
              </Col>
              <Col sm={5}>
                <Input
                  variant="teriary"
                  name="admin.phone"
                  showRequiredMark
                  type="phone"
                  label="Your Direct Phone"
                  placeholder="Enter Your Mobile Phone Number"
                />
              </Col>
              <Col sm={2}>
                <Input
                  variant="teriary"
                  name="admin.extension"
                  label="Ext."
                  placeholder="Ext."
                />
              </Col>
              <Col sm={5}>
                <Input
                  variant="teriary"
                  name="admin.mobile"
                  showRequiredMark
                  type="phone"
                  label="Your Mobile Number"
                  placeholder="Enter Your Mobile Number"
                />
              </Col>
              <Col sm={12}>
                <Button
                  type="submit"
                  className={classNames(styles.nextbtn, "btn-save")}
                  isLoading={isLoading}
                  loaderSize="sm"
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

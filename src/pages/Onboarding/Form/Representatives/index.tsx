import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import { ItemProperties } from "@/components/Sidebar";
import Space from "@/components/Space";
import ThemeInput from "@/components/ThemeInput";
import { AVAIALABLE_ROLES } from "@/constants";
import {
  useCreateRepresentativeMutation,
  useDealerRePresentatives,
  useUpdateRepresentativeMutation,
} from "@/hooks/dealer";
import { OnboardingContext } from "@/providers/OnboardingProvider";
import { User } from "@/types/user";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import get from "lodash/get";
import React, { useContext, useEffect, useState } from "react";
import { PlusCircle } from "react-feather";
import { useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import ContactNumberFooter from "../../ContactNumberFooter";
import styles from "../styles.module.scss";

const BiddingPreference: Record<string, string> = {
  all: "Both New & Old Cars",
  new_car: "Only New Cars",
  used_car: "Only Used Cars",
};

const bidderValidation = yup
  .object()
  .required()
  .shape({
    firstName: yup.string().required("Please enter first name."),
    lastName: yup.string().required("Please enter last name."),
    title: yup.string().required("Please select business title."),
    email: yup
      .string()
      .required("Please enter email.")
      .email("Please enter valid email."),
    phone: yup.string().required("Please enter phone number."),
    mobile: yup.string().required("Please enter mobile number."),
    biddingPreference: yup
      .string()
      .required("Please select bidding preference."),
  });

const scrollToAdd = () => {
  setTimeout(() => {
    const form = document.getElementById("add-rep-form");
    if (form) {
      form.scrollIntoView();
    }
  }, 500);
};
const LabelValue: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <>
    <label className={styles.label}>{label}</label>
    <p className={styles.value}>{value || "-"}</p>
  </>
);
interface RepresentativesProps {
  onNext: (key: ItemProperties, data: Record<string, any>) => void;
}

const Representatives: React.FC<RepresentativesProps> = ({ onNext }) => {
  const [params] = useSearchParams();
  const bidderFromURL = params.get("user");
  const { dealer } = useContext(OnboardingContext);
  const { data: representatives } = useDealerRePresentatives({
    id: String(dealer?._id),
    limit: 1000,
  });

  const [allRepresentatives, setAllRepresentatives] = useState<User[]>([]);
  const [showAddForm, setShowForm] = useState(true);
  const [selectedRepresentative, setSelectedRepresentative] = useState<User>();

  const { isLoading: isCreating, mutateAsync: createRepresentativeMutation } =
    useCreateRepresentativeMutation();
  const { isLoading: isUpdating, mutateAsync: updateRepresentativeMutation } =
    useUpdateRepresentativeMutation();

  useEffect(() => {
    const allReps = representatives?.data || [];
    setAllRepresentatives(allReps);
    if (bidderFromURL) {
      const selectedRep = allReps.find(({ _id }) => _id === bidderFromURL);
      if (selectedRep) {
        setSelectedRepresentative(selectedRep);
        setShowForm(true);
      }
    }
    scrollToAdd();
  }, [bidderFromURL, representatives]);

  const onSubmit = async (formValues: User["_source"]["payload"]) => {
    try {
      const isEdit = Boolean(selectedRepresentative);

      if (isEdit) {
        await updateRepresentativeMutation({
          id: selectedRepresentative?._id as string,
          dealerId: dealer?._id as string,
          data: {
            ...formValues,
            email: String(selectedRepresentative?._source.payload.email),
          },
        });
      } else {
        await createRepresentativeMutation({
          id: dealer?._id as string,
          data: formValues,
        });
      }
      Message.success("Representative details saved succesfully.");

      setShowForm(false);
      setSelectedRepresentative(undefined);
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const onAdd = () => {
    setShowForm(true);
    setSelectedRepresentative(undefined);
    scrollToAdd();
  };

  const onEdit = (representative: User) => {
    setSelectedRepresentative(representative);
    setShowForm(true);
  };

  const isEditMode = Boolean(selectedRepresentative);
  const selectedRepresentativePayload: User["_source"]["payload"] = get(
    selectedRepresentative,
    "_source.payload",
    {}
  );

  return (
    <>
      <div className={styles.representativeContainer}>
        {allRepresentatives.map((representative) => {
          const {
            _id,
            _source: { role, payload },
          } = representative;
          return (
            <div key={_id} className={classNames("mt-4", styles.form)}>
              <Row>
                <Col sm={12}>
                  <LabelValue
                    label="Full Name"
                    value={[payload.first_name, payload.last_name]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </Col>
                <Col sm={12} xs={12}>
                  <LabelValue label="Business Title" value={payload.title} />
                </Col>
                <Col sm={12} xs={12}>
                  <LabelValue label="Email Address" value={payload.email} />
                </Col>
                <Col sm={12}>
                  <LabelValue label="Role" value={role} />
                </Col>
                <Row>
                  <Col lg={8}>
                    <LabelValue
                      label="Phone Direct Line"
                      value={payload.phone}
                    />
                  </Col>
                  <Col lg={4}>
                    <LabelValue label="Ext" value={payload.extension} />
                  </Col>
                </Row>
                <Col sm={12}>
                  <LabelValue label="Mobile / Other" value={payload.mobile} />
                </Col>
                <Col sm={12}>
                  <LabelValue
                    label="Bidding Preference"
                    value={
                      BiddingPreference[payload.bidding_preference as string]
                    }
                  />
                </Col>

                <Col sm={12}>
                  <Button
                    outline
                    className={classNames("w-50", "mt-5")}
                    onClick={() => onEdit(representative)}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
        {showAddForm && (
          <Form
            initialValues={{
              firstName: selectedRepresentativePayload.first_name,
              lastName: selectedRepresentativePayload.last_name,
              title: selectedRepresentativePayload.title || "",
              email: selectedRepresentativePayload.email || "",
              phone: selectedRepresentativePayload.phone || "",
              extension: selectedRepresentativePayload.extension || "",
              mobile: selectedRepresentativePayload.mobile || "",
              biddingPreference:
                selectedRepresentativePayload.bidding_preference || "",
              role: selectedRepresentative?._source?.role || "manager",
            }}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={bidderValidation}
          >
            <div className={classNames("mt-4", styles.form)} id="add-rep-form">
              <Row>
                <Col sm={6}>
                  <Input
                    variant="teriary"
                    name="firstName"
                    label="First Name"
                    placeholder="Larry"
                  />
                </Col>
                <Col sm={6} className="d-none d-sm-block">
                  <Input
                    variant="teriary"
                    name="lastName"
                    label="Last Name"
                    placeholder="David"
                  />
                </Col>
                <Col sm={12}>
                  <Input
                    variant="teriary"
                    name="title"
                    label="Business Title / Administrator"
                    placeholder="Select Title"
                    type="select"
                    options={AVAIALABLE_ROLES}
                  />
                </Col>
                <Col sm={12}>
                  <Input
                    variant="teriary"
                    showRequiredMark
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="Larry.David@CarDeal.com"
                    disabled={isEditMode}
                  />
                </Col>
                <Col sm={12} className="mb-4 d-none d-sm-block">
                  <ThemeInput
                    variant="teriary"
                    type="hidden"
                    showRequiredMark
                    label="Role"
                  />
                  <Space>
                    <Input
                      variant="teriary"
                      type="radio"
                      name="role"
                      label="Data Owner/Manager"
                      value="manager"
                      id="role-manager"
                    />
                    <Input
                      variant="teriary"
                      type="radio"
                      name="role"
                      label="Bidder"
                      value="bidder"
                      id="role-bidder"
                    />
                  </Space>
                </Col>
                <Row className="justify-content-center">
                  <Col lg={8} xs={6}>
                    <Input
                      variant="teriary"
                      showRequiredMark
                      name="phone"
                      label="Phone Direct Line"
                      placeholder="800-555-1234"
                      type="phone"
                    />
                  </Col>
                  <Col lg={4} xs={6}>
                    <Input
                      variant="teriary"
                      showRequiredMark
                      name="extension"
                      label="EXT"
                      placeholder="540"
                    />
                  </Col>
                </Row>
                <Col sm={12}>
                  <Input
                    variant="teriary"
                    showRequiredMark
                    name="mobile"
                    label="Mobile / Other"
                    type="phone"
                    placeholder="954-412-0087"
                  />
                </Col>
                <Col sm={12}>
                  <Input
                    variant="teriary"
                    showRequiredMark
                    name="biddingPreference"
                    label="Bidding Preference"
                    placeholder="Select Bidding Preference"
                    type="select"
                    options={Object.keys(BiddingPreference).map((key) => ({
                      value: key,
                      label: BiddingPreference[key],
                    }))}
                  />
                </Col>

                <Col sm={12} xs={12}>
                  <Button
                    type="submit"
                    className={classNames(styles.addBtn, "w-50", "mt-5")}
                    isLoading={isCreating || isUpdating}
                    loaderSize="sm"
                  >
                    {isEditMode ? "Update" : "Add"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        )}
        <div
          className={classNames(
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "px-5",
            "mt-4",
            styles.addRepresentative
          )}
        >
          <div onClick={onAdd}>
            <div
              className={classNames(
                styles.plusCircle,
                "d-flex",
                "align-items-center",
                "justify-content-center",
                "mx-5"
              )}
            >
              <PlusCircle width="120px" height="120px" />
            </div>
            <div
              className={classNames(
                styles.plusCircleContent,
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <p>
                
                Click To Add New <br /> Dealer Representative
              </p>
            </div>
          </div>
        </div>
      </div>
      <Row className="mt-3">
        <Col lg={6}>
          <ContactNumberFooter />
        </Col>
        <Col lg={6}>
          <Button
            type="submit"
            className={classNames(styles.updatebtn, "w-25", "btn-save")}
            onClick={() => onNext("DEALER_REPRESENTATIVES", {})}
          >

            UPDATE
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Representatives;

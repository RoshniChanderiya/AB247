import Button from "@/components/Button";
import CompanyName from "@/components/CompanyName";
import Modal, { ModalProps } from "@/components/Modal";
import { DEFAULT_DATE_FORMAT, States } from "@/constants";
import {
  useCreateVehicleDeliveryMutation,
  useDeclineVehicleDeliveryMutation,
} from "@/hooks/vehicle";
import { Deals } from "@/types/deals";
import { VehiclePayload } from "@/types/vehicle";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import dayjs from "dayjs";
import get from "lodash/get";
import pick from "lodash/pick";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import TransportForm from "../TransportForm";
import styles from "./styles.module.scss";
import { isTrade } from "@/utils/generic";

export const validations = yup.object().shape({
  name: yup.string().required("Please enter name."),
  street: yup.string().required("Please enter street."),
  townorcity: yup.string().required("Please enter city."),
  state: yup.string().required("Please select state."),
  zipcode: yup
    .string()
    .required("Please enter zipcode.")
    .length(5, "Please enter valid zipcode."),
  contactphone: yup.string().required("Please enter phone."),
  email: yup
    .string()
    .required("Please select  email.")
    .email("Please enter valid email."),
});

export interface UserInfoProps {
  name: string;
  address?: string;
  townorcity: string;
  state: string;
  zipcode: string;
  contactphone: string;
  email: string;
  url?: string;
  street: string;
}

interface ShipModalProps {
  isOpen: ModalProps["isOpen"];
  toggle: ModalProps["toggle"];
  buyerDetails: UserInfoProps;
  dealerDetails: UserInfoProps;
  deal: Deals;
  onBuyerDetailChange: (e: UserInfoProps) => void;
  onDealerDetailChange: (e: UserInfoProps) => void;
  vehicleDetails?: VehiclePayload;
}

export interface VehicleProps {
  model_year?: string;
  model?: string;
  series?: string;
  make?: string;
  vin?: string;
  interior_color_category?: string;
  exterior_color_category?: string;
}

const TransportVehicleModal: React.FC<ShipModalProps> = ({
  isOpen,
  toggle,
  buyerDetails,
  dealerDetails,
  onBuyerDetailChange,
  deal,
  vehicleDetails,
  onDealerDetailChange,
}) => {
  const tradeInId = get(deal, "_source.payload.trade_in.id", "");
  const hasTrade = isTrade(tradeInId);

  const [isTradeTransportation, setisTradeTransportation] = useState(false);

  const buyerFormInitialValues = pick(buyerDetails, [
    "name",
    "townorcity",
    "state",
    "zipcode",
    "contactphone",
    "street",
    "email",
  ]);
  const dealerFormInitialValues = pick(dealerDetails, [
    "name",
    "townorcity",
    "state",
    "zipcode",
    "contactphone",
    "street",
    "email",
  ]);

  const delivered = {
    title: "delivered to",
    viewField: [
      {
        label: "Name:",
        value: buyerDetails.name,
      },
      {
        label: "Address:",
        value: buyerDetails.address,
      },
      {
        label: "Billing Address:",
        value: "same",
      },
      {
        label: "Contact Phone:",
        value: buyerDetails.contactphone,
      },
      {
        label: "Email:",
        value: buyerDetails.email,
        name: "email",
      },
    ],
    editable: {
      title: "",
      onSave: onBuyerDetailChange,
      fields: [
        {
          label: "Name:",
          name: "name",
          showRequiredMark: true,
        },

        {
          label: "Street Address:",
          name: "street",
          showRequiredMark: true,
        },
        [
          {
            label: "Town or City:",
            name: "townorcity",
            showRequiredMark: true,
          },
          {
            label: "state:",
            name: "state",
            type: "select",
            options: States.map((state) => ({
              label: state.name,
              value: state.abbreviation,
            })),
            showRequiredMark: true,
          },
          {
            label: "ZipCode:",
            name: "zipcode",
            showRequiredMark: true,
          },
        ],

        {
          label: "Email Address:",
          name: "email",
          showRequiredMark: true,
        },
        {
          label: "Contact Phone:",
          name: "contactphone",
          showRequiredMark: true,
          type: "phone",
        },
      ],
      validations,
    },
  };
  const pickUP = {
    title: "delivered to",
    viewField: [
      {
        label: "Name:",
        name: "name",
        value: dealerDetails.name,
      },
      {
        label: "Address:",
        value: dealerDetails.address,
      },
      {
        label: "Billing Address:",
        value: "same",
      },
      {
        label: "Contact Phone:",
        value: dealerDetails.contactphone,
      },
      {
        label: "Email:",
        value: dealerDetails.email,
      },
    ],
    editable: {
      title: "",
      onSave: onDealerDetailChange,
      fields: [
        {
          label: "Name:",
          name: "name",
          showRequiredMark: true,
        },
        {
          label: "Street Address:",
          name: "street",
          showRequiredMark: true,
        },
        [
          {
            label: "Town or City:",
            name: "townorcity",
            showRequiredMark: true,
          },
          {
            label: "state:",
            name: "state",
            type: "select",
            options: States.map((state) => ({
              label: state.name,
              value: state.abbreviation,
            })),
            showRequiredMark: true,
          },
          {
            label: "ZipCode:",
            name: "zipcode",
            showRequiredMark: true,
          },
        ],
        {
          label: "Email Address:",
          name: "email",
          showRequiredMark: true,
        },
        {
          label: "Contact Phone:",
          name: "contactphone",
          showRequiredMark: true,
        },
      ],
    },
  };
  const { mutateAsync: crateDeliveryMutation, isLoading: isCreatingDelivery } =
    useCreateVehicleDeliveryMutation();
  const { mutateAsync: declineDeliveryMutation, isLoading: isDeclineDelivery } =
    useDeclineVehicleDeliveryMutation();
  const id = deal._id;

  const onDeclineTrade = async () => {
    try {
      await declineDeliveryMutation({
        id,
      });
      toggle();
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const vehicle = pick(vehicleDetails, [
    "model_year",
    "dealer.dealer_name",
    "model",
    "make",
    "series",
    "vin",
    "interior_color_category",
    "exterior_color_category",
  ]);
  const scheduleDelivery = async () => {
    try {
      const billing = {
        id: null,
        company_name: get(vehicleDetails, "dealer.dealer_name"),
        contact: {
          firstname: buyerDetails.name,
          lastname: "",
          email: buyerDetails.email,
          phone: buyerDetails.contactphone,
          fax: "",
        },
        address: {
          address1: buyerDetails.street,
          address2: "",
          city: buyerDetails.townorcity,
          state: buyerDetails.state,
          zipcode: buyerDetails.zipcode,
        },
        type: "other",
      };

      const buyerAddress = {
        type: "dealership",
        id: null,
        name: buyerDetails.name,
        address: {
          address1: buyerDetails.street,
          address2: "",
          city: buyerDetails.townorcity,
          state: buyerDetails.state,
          zipcode: buyerDetails.zipcode,
        },
        notes: "",
      };

      const dealerInfo = {
        type: "dealership",
        id: null,
        name: dealerDetails.name,
        address: {
          address1: dealerDetails.street,
          address2: "",
          city: dealerDetails.townorcity,
          state: dealerDetails.state,
          zipcode: dealerDetails.zipcode,
        },
        notes: "",
      };

      const type = isTradeTransportation ? "trade_in" : "purchase";

      const payload = {
        type,
        pickup_at: dayjs().format(DEFAULT_DATE_FORMAT),
        billing,
        origin: isTradeTransportation ? buyerAddress : dealerInfo,
        destination: isTradeTransportation ? dealerInfo : buyerAddress,
        vehicles: [
          {
            unit_number: null,
            year: vehicle.model_year,
            make: vehicle.make,
            model: vehicle.model,
            series: vehicle.series,
            vin: vehicle.vin,
            interior_color: vehicle.interior_color_category,
            exterior_color: vehicle.exterior_color_category,
            is_inop: false,
            is_rush: false,
            is_sold: false,
            is_enclosed: false,
          },
        ],
      };

      console.log("payload", payload);
      await crateDeliveryMutation({
        payload,
        id,
      });

      setisTradeTransportation(hasTrade);
      if (isTradeTransportation) {
        setisTradeTransportation(false);
        toggle();
      }
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
      toggle();
    }
  };

  return (
    <Modal
      title={
        isTradeTransportation ? (
          <h4>Set Up Trade-In Pick Up</h4>
        ) : (
          <>
            <p>Set Up Shipping</p>
            <h6>Dates: {dayjs().format(DEFAULT_DATE_FORMAT)}</h6>
          </>
        )
      }
      isOpen={isOpen}
      toggle={toggle}
      filledHeader
      footer={null}
    >
      {isTradeTransportation && (
        <div>
          <h6>
            Would you like <CompanyName /> to pick up the Trade-In at location
            and deliver it to your dealership?
          </h6>
          <h6 className={classNames("mt-1", styles.subDetail)}>
            Trade-In Transport Fee:$350.00
          </h6>
          <hr className="mt-3" />
        </div>
      )}

      <TransportForm
        title={isTradeTransportation ? "PICK UP FROM" : "DELIVERED TO"}
        fields={delivered.viewField}
        editable={delivered.editable}
        initialValues={buyerFormInitialValues}
      />
      <hr />
      <TransportForm
        title={isTradeTransportation ? "DELIVERED TO" : "PICK UP FROM"}
        fields={pickUP.viewField}
        editable={pickUP.editable}
        initialValues={dealerFormInitialValues}
      />

      {!isTradeTransportation && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            isLoading={isCreatingDelivery}
            onClick={scheduleDelivery}
            className="w-100"
          >
            TRANSPORTATION PICK UP
          </Button>
        </div>
      )}

      {isTradeTransportation && (
        <Row className="d-flex justify-content-between mt-4">
          <Col md={6}>
            <Button
              onClick={onDeclineTrade}
              isLoading={isDeclineDelivery}
              className="w-100 "
            >
              DECLINE
            </Button>
          </Col>
          <Col md={6}>
            <Button
              onClick={scheduleDelivery}
              isLoading={isCreatingDelivery}
              className="w-100 mx-2"
            >
              YES PICK UP TRADE IN
            </Button>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default TransportVehicleModal;

import Button from "@/components/Button";
import Space from "@/components/Space";
import { useVehicle, useVehicleDeliveryStatus } from "@/hooks/vehicle";
import { Deals } from "@/types/deals";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import get from "lodash/get";
import React, { useEffect, useState } from "react";
import TransportVehicleModal from "./TransportVehicleModal";

interface ShipVehiclModalProps {
  deal: Deals;
}
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

export interface pickUpInfoProps extends UserInfoProps {}

const ShipVehicle: React.FC<ShipVehiclModalProps> = ({ deal }) => {
  const { data: vehicleDetails } = useVehicle(
    get(deal, "_source.payload.vehicle.vehicle.id")
  );

  const {
    mutateAsync: vehicleDeliveryStatusMutation,
    isLoading: isVehicleDeliveryStatus,
  } = useVehicleDeliveryStatus();

  const [showShipModal, setShowShipModal] = useState(false);
  const buyerInfo = get(deal, "_source.payload.personal_details");
  const { city, state, street_address, zip } = buyerInfo.shipping;
  const {
    dealer_city,
    dealer_state,
    dealer_street,
    dealer_zipcode,
    dealer_url,
    dealer_email,
    dealer_phone,
  } = get(vehicleDetails, "_source.payload.dealer", {});
  const [buyerDetails, setBuyerDetails] = useState<UserInfoProps>({
    name: buyerInfo.full_name,
    address: [street_address, city, state, zip].filter(Boolean).join(" "),
    townorcity: city,
    state: state,
    zipcode: zip,
    contactphone: buyerInfo.phone,
    email: get(deal, "_source.payload.buyer_recipient.email"),
    street: street_address,
  });
  const [dealerDetails, setDealerDetails] = useState<pickUpInfoProps>({
    name: get(vehicleDetails, "_source.payload.display_name"),
    address: [dealer_street, dealer_city, dealer_state, dealer_zipcode]
      .filter(Boolean)
      .join(" "),
    townorcity: dealer_city,
    state: dealer_state,
    zipcode: dealer_zipcode,
    contactphone: dealer_phone,
    email: dealer_email,
    url: dealer_url,
    street: dealer_street,
  });
  useEffect(() => {
    setDealerDetails({
      name: get(vehicleDetails, "_source.payload.display_name"),
      address: [dealer_street, dealer_city, dealer_state, dealer_zipcode]
        .filter(Boolean)
        .join(" "),
      townorcity: dealer_city,
      state: dealer_state,
      zipcode: dealer_zipcode,
      contactphone: dealer_phone,
      email: dealer_email,
      url: dealer_url,
      street: dealer_street,
    });
  }, [
    dealer_city,
    dealer_state,
    dealer_street,
    dealer_zipcode,
    dealer_url,
    dealer_email,
    dealer_phone,
    vehicleDetails,
  ]);
  const onBuyerDetailChange = (value: UserInfoProps) => {
    const { street, townorcity, state, zipcode } = value;
    const address = [street, townorcity, state, zipcode]
      .filter(Boolean)
      .join(" ");
    setBuyerDetails({ ...value, address });
  };
  const onDealerDetailChange = (value: pickUpInfoProps) => {
    const { street, townorcity, state, zipcode } = value;
    const address = [street, townorcity, state, zipcode]
      .filter(Boolean)
      .join(" ");
    setDealerDetails({ ...value, address });
  };

  const vehicleShippingStatus = async () => {
    try {
      await vehicleDeliveryStatusMutation(deal._id);
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  const toggleShipModal = () => {
    setShowShipModal((prev) => !prev);
  };
  const shippingStatus = get(
    deal,
    "_source.payload.acertus.purchase.status",
    ""
  );
  return (
    <>
      <Space align="center" justify="center" size="small">
        {shippingStatus && (
          <Button
            size="sm"
            isLoading={isVehicleDeliveryStatus}
            onClick={vehicleShippingStatus}
          >
            Status
          </Button>
        )}
        {!shippingStatus && (
          <Button size="sm" onClick={toggleShipModal}>
            Ship
          </Button>
        )}
      </Space>
      <TransportVehicleModal
        isOpen={showShipModal}
        toggle={toggleShipModal}
        deal={deal}
        buyerDetails={buyerDetails}
        dealerDetails={dealerDetails}
        onBuyerDetailChange={onBuyerDetailChange}
        vehicleDetails={get(vehicleDetails, "_source.payload")}
        onDealerDetailChange={onDealerDetailChange}
      />
    </>
  );
};
export default ShipVehicle;

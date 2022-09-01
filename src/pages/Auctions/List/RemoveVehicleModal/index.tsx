import Modal from "@/components/Modal";
import { useRemoveVehicleMutation } from "@/hooks/auction";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import React from "react";
import styles from "./styles.module.scss";

interface RemoveVehicleModalProps {
  auctionId: string;
  vehicleId: string;
  open: boolean;
  onClose: () => void;
}

const RemoveVehicleModal: React.FC<RemoveVehicleModalProps> = ({
  open,
  onClose,
  auctionId,
  vehicleId,
}) => {
  const { isLoading, mutateAsync: removeVehicleMutation } =
    useRemoveVehicleMutation();

  const onDelete = async () => {
    try {
      await removeVehicleMutation({
        auctionId,
        vehicleId,
      });
      onClose();
      Message.success("Vehicle removed successfully.");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      okText="YES, REMOVE VEHICLE"
      onOk={onDelete}
      onCancel={onClose}
      cancelText="NO"
      noHeader
      cancelButtonProps={{
        loaderSize: "sm",
        className: styles.cancelButton,
      }}
      okButtonProps={{
        isLoading,
        loaderSize: "sm",
      }}
    >
      <div className="px-5 text-center">
        Are you sure you want to remove the vehicle from the auction?
      </div>
    </Modal>
  );
};

export default RemoveVehicleModal;

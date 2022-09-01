import Modal from "@/components/Modal";
import Space from "@/components/Space";
import { useRemoveInventoryVehicleMutation } from "@/hooks/vehicle";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import React from "react";
import styles from "./styles.module.scss";

interface DeleteInventoryProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

const DeleteInventory: React.FC<DeleteInventoryProps> = ({
  open,
  id,
  onClose,
}) => {
  const { isLoading, mutateAsync: removeVehicleMutation } =
    useRemoveInventoryVehicleMutation();
  const onDelete = async () => {
    try {
      await removeVehicleMutation(id);
      Message.success("Vehicle removed successfully.");
      onClose();
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      okText="YES, Remove vehicle"
      onOk={onDelete}
      onCancel={onClose}
      cancelText="keep vehicle"
      noHeader
      cancelButtonProps={{
        className: styles.cancelButton,
      }}
      okButtonProps={{
        isLoading,
        loaderSize: "sm",
      }}
    >
      <div className="px-5 text-center">
        <Space direction="vertical">
          <p>Are you sure you want to remove vehicle from All inventroy?</p>
          <p>
            If you change your mind, you can find this vehicle in the deleted
            inventory, until it is available.
          </p>
        </Space>
      </div>
    </Modal>
  );
};

export default DeleteInventory;

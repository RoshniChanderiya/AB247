import Modal from "@/components/Modal";
import Space from "@/components/Space";
import { useRestoreInventoryVehicleMutation } from "@/hooks/vehicle";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import React from "react";
import styles from "./styles.module.scss";

interface RestoreVehicleModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
}
const RestoreVehicleModal: React.FC<RestoreVehicleModalProps> = ({
  open,
  id,
  onClose,
}) => {
  const { isLoading, mutateAsync: restoreVehicleMutation } =
    useRestoreInventoryVehicleMutation();

  const onRestore = async () => {
    try {
      await restoreVehicleMutation(id);
      Message.success("Vehicle restored successfully.");
      onClose();
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      okText="YES, Restore vehicle"
      onOk={onRestore}
      onCancel={onClose}
      cancelText="No"
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
          <p>
            Are you sure you want to restore vehicle from removed inventroy?
          </p>
        </Space>
      </div>
    </Modal>
  );
};

export default RestoreVehicleModal;

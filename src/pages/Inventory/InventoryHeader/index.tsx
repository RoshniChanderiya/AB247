import Button from "@/components/Button";
import Link from "@/components/Link";
import { AppRoutes } from "@/constants";
import { useUpdateInventoryMutation } from "@/hooks/vehicle";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import { useContext } from "react";
import { InventoryContext } from "..";
import AgeCircle from "../AgeCircle";
import styles from "./styles.module.scss";
import YMMSSSelection from "./YMMSSSelection";

const InventoryHeader = () => {
  const { state } = useContext(InventoryContext);
  const { isLoading, mutateAsync: updateInventoryMutation } =
    useUpdateInventoryMutation();

  const updateInventory = async (uvc: string) => {
    try {
      await updateInventoryMutation(uvc);
      Message.success("Inventory updated successfully");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const isActive = state === "active";
  return (
    <div className={classNames(styles.header, "px-4 mx-0")}>
      <div
        className={classNames(
          styles.searchContainer,
          "d-flex",
          "align-items-center",
          "py-3",
          "w-100",
          "justify-content-between"
        )}
      >
        <div className={styles.heading}>
          <h5>All Inventory</h5>
        </div>
        <div className={styles.filterBox}>
          <YMMSSSelection
            buttonProps={{
              onClick: updateInventory,
              isLoading,
              className: styles.updateButton,
            }}
          />
        </div>
        <Link to={isActive ? AppRoutes.REMOVED_INVENTORY : AppRoutes.INVENTORY}>
          <Button color="secondary">
            {isActive ? "REMOVED INVENTORY" : "ALL INVENTORY"}
          </Button>
        </Link>
      </div>
      <div className="d-flex">
        <div className={styles.filterText}>
          <AgeCircle days={30} />
          {" < "} <span className={styles.dayText}>30 days</span>
        </div>
        <div className={styles.filterText}>
          <AgeCircle days={31} />
          <span className={styles.dayText}>31 - 60 days</span>
        </div>
        <div className={styles.filterText}>
          <AgeCircle days={61} />
          <span className={styles.dayText}>61 - 90 days +</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;

import { useUpdateInventoryMutation } from "@/hooks/vehicle";
import { InventoryContext } from "@/pages/Inventory";
import AgeCircle from "@/pages/Inventory/AgeCircle";
import YMMSSSelection from "@/pages/Inventory/InventoryHeader/YMMSSSelection";
import InventoryList from "@/pages/Inventory/List";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import styles from "./../styles.module.scss";

const AllInventory: React.FC = () => {
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
  return (
    <InventoryContext.Provider value={{ state: "active" }}>
      <div className={classNames(styles.header, "px-4 mx-0")}>
        <div
          className={classNames(
            styles.searchContainer,
            "d-flex",
            "align-items-center",
            "mt-3",
            "w-100"
          )}
        >
          <div className="d-flex">
            <YMMSSSelection
              buttonProps={{
                onClick: updateInventory,
                isLoading,
              }}
            />
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className={styles.filterText}>
              <AgeCircle days={30} />
              <span className={styles.dayText}>{" < "} 30 days</span>
            </div>
            <div className={styles.filterText}>
              <AgeCircle days={31} />
              <span className={styles.dayText}>{" < "} 31 - 60 days</span>
            </div>
            <div className={styles.filterText}>
              <AgeCircle days={61} />
              <span className={styles.dayText}>{" < "} 61 - 90 days +</span>
            </div>
          </div>
        </div>
      </div>
      <InventoryList isSummary />
    </InventoryContext.Provider>
  );
};

export default AllInventory;

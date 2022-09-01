import { Rotate, Trash } from "@/assets/images";
import FloorPriceInput from "@/components/FloorPriceInput";
import Table, { ColumnProps } from "@/components/Table";
import {
  useUpdateFloorBidMutation,
  useVehicleInventory,
} from "@/hooks/vehicle";
import { Vehicle } from "@/types/vehicle";
import { formatNumber } from "@/utils/NumberFomatter";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import React, { useContext, useState } from "react";
import { InventoryContext } from "..";
import AgeCircle from "../AgeCircle";
import DeleteInventory from "./DeleteInventoryModal";
import RestoreVehicleModal from "./RestoreVehicleModal";
import styles from "./styles.module.scss";

interface InventoryListProps {
  isSummary?: boolean;
}
const InventoryList: React.FC<InventoryListProps> = ({ isSummary }) => {
  const { state } = useContext(InventoryContext);
  const { isLoading, data } = useVehicleInventory({
    state,
    limit: isSummary ? 5 : 10000,
  });
  const [showConfirmationModal, setShowConfirmModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [placingBidId, setPlacingBidId] = useState("");

  const { isLoading: isPlacingBid, mutateAsync: updateFloorBidMutation } =
    useUpdateFloorBidMutation();

  const toggleModal = () => {
    setShowConfirmModal((prev) => !prev);
  };

  const updateFloorBid = async (amount: number, id: string) => {
    setPlacingBidId(id);
    try {
      await updateFloorBidMutation({
        amount,
        id,
      });
      Message.success("Floor bid updated successfully.");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
    setPlacingBidId("");
  };

  const isActive = state === "active";

  const columns: ColumnProps<Vehicle>[] = [
    {
      name: "RATING",
      dataKey: "_source.payload.listing_first_date",
      render: (firstDate: number) => {
        const days = dayjs().diff(dayjs(firstDate), "days");
        return <AgeCircle days={days} />;
      },
    },
    {
      name: "AGE",
      dataKey: "_source.payload.listing_first_date",
      render: (firstDate: string) => {
        const days = dayjs().diff(dayjs(firstDate), "days");
        return `${days} ${days === 1 ? "Day" : "Days"}`;
      },
      width: 100,
      sort: true,
    },
    {
      name: "VIN NUMBER",
      dataKey: "_source.payload.vin",
    },
    {
      name: "YEAR",
      dataKey: "_source.payload.model_year",
      sort: true,
    },
    {
      name: "MAKE",
      dataKey: "_source.payload.make",
    },
    {
      name: "MODEL",
      dataKey: "_source.payload.model",
    },
    {
      name: "STYLE",
      dataKey: "_source.payload.style",
      width: 200,
    },
    {
      name: "FLOOR PRICE",
      dataKey: "_source.payload.floor_bid",
      render: (floorBid: number) => (
        <strong>
          {formatNumber(floorBid, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </strong>
      ),
      sort: true,
      width: "10%",
    },
    {
      name: "UPDATE FLOOR",
      dataKey: "_source.payload.floor_bid",
      sort: true,
      render: (floor: number, vehicle: Vehicle) => (
        <FloorPriceInput
          floorPrice={floor}
          center
          onPlaceBid={(amount: number) => updateFloorBid(amount, vehicle._id)}
          isPlacingBid={placingBidId === vehicle._id && isPlacingBid}
        />
      ),
      width: 400,
    },
    {
      name: isActive ? "REMOVE" : "RESTORE VEHICLE",
      dataKey: "_id",
      render: (id: string) => {
        const Icon = isActive ? Trash : Rotate;
        return (
          <Icon
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
              setSelectedInventory(id);
            }}
            className={styles.trashIcon}
            role="alert"
          />
        );
      },
    },
  ];
  return (
    <div className={classNames(styles.inventoryTable)}>
      <Table
        columns={columns.filter((_, index: number) =>
          isActive ? true : index !== columns.length - 2
        )}
        loading={isLoading}
        items={orderBy(
          data?.data || [],
          (current) => dayjs(current._source.payload.listing_first_date).unix(),
          "asc"
        )}
        rowKey="_id"
      />
      {isActive && (
        <DeleteInventory
          open={showConfirmationModal}
          onClose={toggleModal}
          id={selectedInventory}
        />
      )}
      {!isActive && (
        <RestoreVehicleModal
          open={showConfirmationModal}
          onClose={toggleModal}
          id={selectedInventory}
        />
      )}
    </div>
  );
};

export default InventoryList;

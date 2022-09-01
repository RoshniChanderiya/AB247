import { Trash } from "@/assets/images";
import BackendProfit from "@/components/BackendProfit";
import FloorPrice from "@/pages/Auctions/List/FloorPrice";
import Table, { ColumnProps, TableRef } from "@/components/Table";
import Timer from "@/components/Timer";
import VehicleDetails from "@/components/VehicleDetails";
import { AUCTION_STATES, DEFAULT_DATE_TIME_FORMAT } from "@/constants";
import { Auction, AuctionState } from "@/types/auction";
import { formatNumber } from "@/utils/NumberFomatter";
import classNames from "classnames";
import dayjs from "dayjs";
import get from "lodash/get";
import React, { useMemo, useState } from "react";
import RemoveVehicleModal from "../RemoveVehicleModal";
import ExpandedRow from "./ExpandedRow";
import styles from "./styles.module.scss";

interface AuctionTableViewProps {
  auctions: Auction[];
  state: AuctionState;
  loading: boolean;
}
const AuctionTableView: React.ForwardRefRenderFunction<
  TableRef,
  AuctionTableViewProps
> = ({ state, auctions, loading }, ref) => {
  const [deleteModalConfirmation, setDeleteModalConfirmation] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalConfirmation((prev) => !prev);
  };

  const columns: ColumnProps<Auction>[] = useMemo(() => {
    switch (state) {
      case AUCTION_STATES.live:
        return [
          {
            name: "ACTIVE BID",
            dataKey: "payload.current_low_bid",
            render: (value: string) => (
              <strong>
                {formatNumber(parseInt(value), {
                  minimumFractionDigits: 0,
                })}
              </strong>
            ),
            sort: true,
          },
          {
            name: "YOUR BID",
            dataKey: "payload.vehicle.floor_bid",
            render: (_: string, auction?: Auction) => (
              <FloorPrice
                buttonText="BID"
                auction={auction as Auction}
                size="sm"
              />
            ),
            sort: true,
            align: "left",
          },
          {
            name: "FICO",
            dataKey: "payload.buyer.fico",
            render: (fico: string) => fico ?? "721",
            sort: true,
            align: "left",
          },
          {
            name: "AGE",
            dataKey: "payload.vehicle.days_on_market",
            render: (days: number) => `${days} ${days === 1 ? "Day" : "Days"}`,
            sort: true,
          },
          {
            name: "VEHICLE MODEL",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="model" />,
          },
          {
            name: "COLOR",
            dataKey: "payload.vehicle.exterior_color_category",
          },
          {
            name: "MILES",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="miles" />,
          },
          {
            name: "VIN NUMBER",
            dataKey: "payload.vehicle.vin",
          },
          {
            name: "TIME LEFT",
            dataKey: "payload.timer",
            render: (timer: number) => (
              <strong>
                <Timer timeInSeconds={timer / 1000} />
              </strong>
            ),
            sort: true,
          },
        ];

      case AUCTION_STATES.scheduled:
        return [
          {
            name: "FLOOR PRICE",
            dataKey: "payload.vehicle.floor_bid",
            render: (_: string, auction: Auction) => (
              <FloorPrice auction={auction} />
            ),
            sort: true,
            align: "left",
          },
          {
            name: "FICO",
            dataKey: "payload.buyer.fico",
            render: (fico: string) => fico ?? "721",
            sort: true,
            align: "left",
          },
          {
            name: "AGE",
            dataKey: "payload.vehicle.days_on_market",
            render: (days: number) => `${days} ${days === 1 ? "Day" : "Days"}`,
            sort: true,
          },
          {
            name: "VEHICLE MODEL",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="model" />,
          },
          {
            name: "COLOR",
            dataKey: "payload.vehicle.exterior_color_category",
          },
          {
            name: "MILES",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="miles" />,
          },
          {
            name: "VIN NUMBER",
            dataKey: "payload.vehicle.vin",
          },
          {
            name: "DATE & TIME",
            dataKey: "payload.auction_start_time",
            render: (startTime: string) =>
              dayjs(startTime).format(DEFAULT_DATE_TIME_FORMAT),
            sort: true,
          },
          {
            name: "REMOVE",
            dataKey: "id",
            render: (id: string, auction: Auction) => (
              <>
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDeleteModal();
                  }}
                  className={styles.trashIcon}
                  role="alert"
                />

                <RemoveVehicleModal
                  open={deleteModalConfirmation}
                  onClose={toggleDeleteModal}
                  auctionId={id}
                  vehicleId={get(auction, "payload.vehicle.id", "")}
                />
              </>
            ),
          },
        ];
      case AUCTION_STATES.expiring:
        return [
          {
            name: "ACTIVE BID",
            dataKey: "payload.current_low_bid",
            render: (value: string) => (
              <strong>
                {formatNumber(parseInt(value), {
                  minimumFractionDigits: 0,
                })}
              </strong>
            ),
            sort: true,
          },
          {
            name: "YOUR BID",
            dataKey: "payload.current_low_bid",
            render: (_: string, auction: Auction) => (
              <FloorPrice
                auction={auction}
                size="sm"
                hideButton
                showCurrentBid
              />
            ),
            sort: true,
          },
          {
            name: "FICO",
            dataKey: "payload.buyer.fico",
            render: (fico: string) => fico ?? "721",
            sort: true,
          },
          {
            name: "AGE",
            dataKey: "payload.vehicle.days_on_market",
            render: (days: number) => `${days} ${days === 1 ? "Day" : "Days"}`,
            sort: true,
          },
          {
            name: "VEHICLE MODEL",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="model" />,
          },
          {
            name: "COLOR",
            dataKey: "payload.vehicle.exterior_color_category",
          },
          {
            name: "MILES",
            dataKey: "payload.vehicle.id",
            render: (id: string) => <VehicleDetails id={id} dataKey="miles" />,
          },
          {
            name: "VIN NUMBER",
            dataKey: "payload.vehicle.vin",
          },
          {
            name: "BACKEND PROFIT",
            dataKey: "payload.backend_profit",
            render: (_: string, auction: Auction) => (
              <BackendProfit auction={auction} />
            ),
          },
        ];
      default:
        return [];
    }
  }, [state, deleteModalConfirmation]);

  return (
    <Table
      ref={ref}
      columns={columns}
      items={auctions}
      expandable={{
        expandedRowRender: (auction: Auction) => (
          <ExpandedRow auction={auction} state={state} />
        ),
      }}
      loading={loading}
      rowKey="key"
      rowProps={(auction: Auction) => ({
        className: classNames({
          [styles.error]:
            get(auction, "payload.current_low_bid") <
              get(auction, "payload.vehicle.floor_bid") &&
            state === AUCTION_STATES.live,
        }),
      })}
    />
  );
};

export default React.forwardRef(AuctionTableView);

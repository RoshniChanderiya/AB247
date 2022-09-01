import Space from "@/components/Space";
import Table, { ColumnProps } from "@/components/Table";
import UserName from "@/components/UserName";
import VehicleDetails from "@/components/VehicleDetails";
import { Auction } from "@/types/auction";
import { formatNumber } from "@/utils/NumberFomatter";
import get from "lodash/get";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";

interface AuctionDetailViewProps {
  auction: Auction;
}

const AuctionDetailView: React.FC<AuctionDetailViewProps> = ({ auction }) => {
  const finalBidAmount = get(
    auction,
    "payload.auction.winner_bids.0.final_bid",
    get(
      auction,
      "payload.auction.current_low_bid",
      get(auction, "payload.auction.winner_bids.0.floor_bid", 0)
    )
  );
  const vehicles = useMemo(() => {
    const auctionVehicles: Auction["payload"]["vehicles"] = get(
      auction,
      "payload.vehicles",
      []
    );
    const winnerVehicle = get(auction, "payload.auction.winner_bids.0.vin");
    return (auctionVehicles || []).filter(({ vin }) => winnerVehicle !== vin);
  }, [auction]);

  const columns: ColumnProps<Auction>[] = [
    {
      name: "VIN NUMBER",
      dataKey: "vin",
    },
    {
      name: "YEAR",
      dataKey: "id",
      render: (id: string) => <VehicleDetails id={id} dataKey="year" />,
    },
    {
      name: "MAKE",
      dataKey: "make",
    },
    {
      name: "MODEL",
      dataKey: "model",
    },
    {
      name: "Style",
      dataKey: "id",
      render: (id: string) => <VehicleDetails id={id} dataKey="style" />,
    },
    {
      name: "REP'D BY",
      dataKey: "bidder.bidder_id",
      render: (id: string) => <UserName id={id} type="bidder" />,
    },
    {
      name: "AGE",
      dataKey: "id",
      render: (id: string) => <VehicleDetails id={id} dataKey="age" />,
    },
    {
      name: "FLOOR PRICE",
      dataKey: "floor_bid",
      render: (price: number) => formatNumber(price),
    },
    {
      name: "SELL PRICE",
      dataKey: "id",
      render: () => formatNumber(finalBidAmount),
    },
    {
      name: "LOST BY",
      dataKey: "floor_bid",
      render: (bid: number) => formatNumber(bid - finalBidAmount),
    },
  ];
  return (
    <div className={styles.details}>
      <Space direction="vertical">
        <small>Detailed View</small>
        <div className={styles.tableContainer}>
          <Table columns={columns} items={vehicles} />
        </div>
      </Space>
    </div>
  );
};

export default AuctionDetailView;

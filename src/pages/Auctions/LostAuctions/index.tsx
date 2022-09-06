import Table, { ColumnProps } from "@/components/Table";
import VehicleDetails from "@/components/VehicleDetails";
import { DEFAULT_DATE_TIME_FORMAT } from "@/constants";
import { useAuctions } from "@/hooks/auction";
import { Auction } from "@/types/auction";
import dayjs from "dayjs";
import orderBy from "lodash/orderBy";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionListSubHeader, {
  AuctionSubHeaderProps,
} from "../AuctionListSubHeader";
import AuctionDetailView from "./AuctionDetailView";

interface LostAuctionProps {
  duration?: AuctionSubHeaderProps["selectedDuration"];
  isSummary?: boolean;
}
const LostAuctions: React.FC<LostAuctionProps> = ({ duration, isSummary }) => {
  const [params, setParams] = useSearchParams();

  const selectedDuration = useMemo(() => {
    return (
      (params.get("duration") as AuctionSubHeaderProps["selectedDuration"]) ||
      duration ||
      "week"
    );
  }, [params, duration]);

  const { isLoading, data: auctions } = useAuctions({
    state: ["completed"],
  });

  const setSelectedDuration = (duration: string) => {
    setParams({
      duration,
    });
  };

  const columns: ColumnProps<Auction>[] = [
    {
      name: "DATE",
      dataKey: "payload.auction_start_time",
      render: (auctionEndTime: string) => (
        <strong>
          {dayjs(auctionEndTime).format(DEFAULT_DATE_TIME_FORMAT)}
        </strong>
      ),
      sort: true,
      align: "left",
    },
    {
      name: "YEAR",
      dataKey: "payload.vehicles.0.id",
      sort: true,
      align: "left",
      render: (vehicleId: string) => (
        <VehicleDetails id={vehicleId} dataKey="year" />
      ),
    },
    {
      name: "MAKE",
      dataKey: "payload.vehicles.0.id",
      sort: true,
      align: "left",
      render: (vehicleId: string) => (
        <VehicleDetails id={vehicleId} dataKey="make" />
      ),
    },
    {
      name: "MODEL",
      dataKey: "payload.vehicles.0.id",
      sort: true,
      align: "left",
      render: (vehicleId: string) => (
        <VehicleDetails id={vehicleId} dataKey="model" />
      ),
    },
    {
      name: "AUCTION NUMBER",
      dataKey: "id",
      sort: true,
      align: "left",
    },
  ];

  const newAuctions = orderBy(
    auctions,
    (current) => dayjs(current.payload.auction_end_time).unix(),
    "desc"
  );
  const actualAuctions = () => {
    switch (selectedDuration) {
      case "week":
        const currentWeek = [dayjs().subtract(1, "week"), dayjs()];
        return newAuctions.filter(
          ({ payload: { auction_end_time } }) =>
            dayjs(auction_end_time).isAfter(currentWeek[0]) &&
            dayjs(auction_end_time).isBefore(currentWeek[1])
        );

      case "month":
        const currentMonth = [dayjs().subtract(1, "month"), dayjs()];
        return newAuctions.filter(
          ({ payload: { auction_end_time } }) =>
            dayjs(auction_end_time).isAfter(currentMonth[0]) &&
            dayjs(auction_end_time).isBefore(currentMonth[1])
        );

      case "3months":
        const currentQuarter = [dayjs().subtract(3, "month"), dayjs()];
        return newAuctions.filter(
          ({ payload: { auction_end_time } }) =>
            dayjs(auction_end_time).isAfter(currentQuarter[0]) &&
            dayjs(auction_end_time).isBefore(currentQuarter[1])
        );

      default:
        return newAuctions;
    }
  };

  return (
    <>
      {!isSummary && (
        <AuctionListSubHeader
          state="completed"
          view="table"
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
        />
      )}
      <Table
        columns={columns}
        loading={isLoading}
        items={isSummary ? actualAuctions().splice(0, 6) : actualAuctions()}
        expandable={{
          expandedRowRender: (auction: Auction) => (
            <AuctionDetailView auction={auction} />
          ),
          heading: "DETAILED VIEW",
          align: "left",
        }}
      />
    </>
  );
};

export default LostAuctions;

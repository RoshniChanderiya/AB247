import PurchaseOrderSignModal from "@/components/PurchaseOrderSignModal";
import Table, { ColumnProps } from "@/components/Table";
import UserName from "@/components/UserName";
import { DEFAULT_DATE_FORMAT } from "@/constants";
import { useDeals } from "@/hooks/deals";
import { Deals } from "@/types/deals";
import { formatNumber } from "@/utils/NumberFomatter";
import dayjs from "dayjs";
import get from "lodash/get";
import React from "react";

const NewDeals: React.FC = () => {
  const { data, isLoading } = useDeals({
    type: "new",
  });

  const deals = get(data, "data", []);

  const columns: ColumnProps<Deals>[] = [
    {
      name: "REPD BY",
      dataKey: "_source.payload.vehicle.bidder.bidder_id",
      render: (bidderId: string) => <UserName type="bidder" id={bidderId} />,
      sort: true,
    },
    {
      name: "SOLD PRICE",
      dataKey: "_source.payload.total_amount",
      render: (totalAmount: number) => (
        <>
          {formatNumber(totalAmount, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </>
      ),
      sort: true,
    },
    {
      name: "BUYER",
      dataKey: "_source.payload.personal_details.full_name",
    },
    {
      name: "ADDRESS",
      dataKey: "_source.payload.personal_details.billing",
      render: (address: any) => (
        <>
          {get(address, "street_address")} <br />
          {get(address, "city")}, {get(address, "state")} {get(address, "zip")}
        </>
      ),
    },
    {
      name: "FICO",
      dataKey: "_source.payload.pre_qualify_details.score",
      sort: true,
    },
    {
      name: "VEHICLE MODEL",
      dataKey: "_source.payload.vehicle.model",
    },
    {
      name: "VIN NUMBER",
      dataKey: "_source.payload.vehicle.vin",
      render: (vin: string) => (
        <>
          ...
          {vin?.substring(9, 17)}
        </>
      ),
    },
    {
      name: "SOLD ON DATE",
      dataKey: "_source.created",
      render: (created: string) => dayjs(created).format(DEFAULT_DATE_FORMAT),
      sort: true,
    },
    {
      name: "UPDATE",
      dataKey: "_source.payload.dealer_recipient.shared_link",
      render: (link: string) => (
        <PurchaseOrderSignModal link={link} buttonText="Sign" />
      ),
    },
  ];

  return (
    <Table
      title="New Deals"
      searchable
      columns={columns}
      items={deals as Deals[]}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default NewDeals;

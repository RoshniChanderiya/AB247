import PurchaseOrderSignModal from "@/components/PurchaseOrderSignModal";
import Table, { ColumnProps } from "@/components/Table";
import { DEFAULT_DATE_FORMAT } from "@/constants";
import { useDeals } from "@/hooks/deals";
import { Deals } from "@/types/deals";
import { formatNumber } from "@/utils/NumberFomatter";
import dayjs from "dayjs";
import get from "lodash/get";
import upperFirst from "lodash/upperFirst";
import React from "react";
import ShipVehicleModal from "./ShipVehicleModal";

const FundedDeals: React.FC = () => {
  const { data, isLoading } = useDeals({
    type: "funded",
  });

  const deals = get(data, "data", []);

  const columns: ColumnProps<Deals>[] = [
    {
      name: "PURCHASE ORDER",
      dataKey: "_source.payload.dealer_recipient.shared_link",
      render: (link: string) => (
        <PurchaseOrderSignModal link={link} buttonText="VIEW" />
      ),
    },
    {
      name: "CUSTOMER",
      dataKey: "_source.payload.personal_details.full_name",
    },
    {
      name: "EMAIL",
      dataKey: "_source.payload.buyer_recipient.email",
      render: (email: string) => (
        <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
          {email}
        </a>
      ),
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
      name: "TYPE",
      dataKey: "_source.payload.fundingDeails.type",
      render: (type: string) => upperFirst(type),
      sort: true,
    },
    {
      name: "AMOUNT FUNDED",
      dataKey: "_source.payload.fundingDeails.funded",
      render: (fundedAmount: number) => <>{formatNumber(fundedAmount || 0)}</>,
      sort: true,
    },
    {
      name: "TERMS",
      dataKey: "_source.payload.fundingDeails.terms",
      render: (terms: number) => `${terms || 0} mo.`,
    },
    {
      name: "DOWN",
      dataKey: "_source.payload.payment_summary.down_payment",
      render: (amount: number) =>
        formatNumber(amount, {
          minimumFractionDigits: 0,
        }),
    },
    {
      name: "PAYMENT",
      dataKey: "_source.payload.fundingDeails.price",
      render: (amount: number) =>
        `${formatNumber(amount, {
          minimumFractionDigits: 0,
        })} mo.`,
    },
    {
      name: "SOLD ON DATE",
      dataKey: "_source.created",
      render: (created: string) => dayjs(created).format(DEFAULT_DATE_FORMAT),
    },
    {
      name: "FUNDED DATE",
      dataKey: "_source.payload.fundingDeails.date",
      render: (created: string) => dayjs(created).format(DEFAULT_DATE_FORMAT),
    },
    {
      name: "BANK",
      dataKey: "_source.payload.fundingDeails.bank",
    },
    {
      name: "STATUS",
      dataKey: "_source.status",
      render: () => "Ready",
    },
    {
      name: "ACTION",
      dataKey: "_id",
      render: (id: string, deal: Deals) => {
        return <ShipVehicleModal deal={deal} />;
      },
    },
  ];

  return (
    <Table
      title="Funded Deals"
      searchable
      columns={columns}
      items={deals as Deals[]}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default FundedDeals;

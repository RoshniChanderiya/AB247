import Table, { ColumnProps } from "@/components/Table";
import UserName from "@/components/UserName";
import { DEFAULT_DATE_FORMAT } from "@/constants/generic";
import { useDeals } from "@/hooks/deals";
import { Deals } from "@/types/deals";
import { formatNumber } from "@/utils/NumberFomatter";
import dayjs from "dayjs";
import SignDocModal from "../../Deals/Pending/SignDocModal";

const PendingDeals: React.FC = () => {
  const { isLoading, data } = useDeals({
    type: "pending",
    limit: 5,
  });
  const dealData = data?.data || [];

  const columns: ColumnProps<Deals>[] = [
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
      name: "BUY PRICE",
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
      name: "CUSTOMER",
      dataKey: "_source.payload.personal_details.full_name",
    },
    {
      name: "DATE",
      dataKey: "_source.created",
      render: (created: string) => dayjs(created).format(DEFAULT_DATE_FORMAT),
      sort: true,
    },
    {
      name: "PENDING",
      dataKey: "_source.created",
      render: (created: string) => {
        const totalDays = dayjs().diff(created, "days");
        return `${totalDays} ${totalDays === 1 ? "Day" : "Days"}`;
      },
      sort: true,
    },
    {
      name: "DOCS SIGNED",
      dataKey: "_id",
      render: (id: string, deal: Deals) => <SignDocModal deal={deal} />,
    },
    {
      name: "REPD BY",
      dataKey: "_source.payload.vehicle.bidder.bidder_id",
      render: (bidderId: string) => <UserName type="bidder" id={bidderId} />,
    },
  ];

  return (
    <Table
      title="Pending Deals"
      searchable={false}
      columns={columns}
      items={dealData}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default PendingDeals;

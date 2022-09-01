import { XCircle } from "@/assets/images";
import Modal from "@/components/Modal";
import PurchaseOrderSignModal from "@/components/PurchaseOrderSignModal";
import Table, { ColumnProps } from "@/components/Table";
import ThemeInput from "@/components/ThemeInput";
import UserName from "@/components/UserName";
import { DEFAULT_DATE_FORMAT } from "@/constants";
import { useCancelDealMutation, useDeals } from "@/hooks/deals";
import { Deals } from "@/types/deals";
import { formatNumber } from "@/utils/NumberFomatter";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import dayjs from "dayjs";
import get from "lodash/get";
import React, { useState } from "react";
import SignDocModal from "./SignDocModal";
import styles from "./styles.module.scss";

const PendingDeals: React.FC = () => {
  const [showCancelDealConfirmation, setShowCancelDealConfirmation] =
    useState(false);
  const [reason, setReason] = useState("");
  const { data, isLoading } = useDeals({
    type: "pending",
  });
  const { isLoading: isCancellingDeal, mutateAsync: cancelDealMutation } =
    useCancelDealMutation();

  const deals = get(data, "data", []);

  const cancelDeal = async (id: string) => {
    try {
      await cancelDealMutation({ id, reason });
      setShowCancelDealConfirmation(false);
      Message.success("Deal cancelled successfully");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  const columns: ColumnProps<Deals>[] = [
    {
      name: "VIEW DEAL",
      dataKey: "_source.payload.dealer_recipient.shared_link",
      render: (link: string) => (
        <PurchaseOrderSignModal link={link} buttonText="View" />
      ),
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
      name: "BUY PRICE",
      dataKey: "_source.payload.total_amount",
      render: (totalAmount: number) => <>{formatNumber(totalAmount)}</>,
      sort: true,
    },
    {
      name: "CUSTOMER",
      dataKey: "_source.payload.personal_details.full_name",
    },
    {
      name: "PHONE",
      dataKey: "_source.payload.personal_details.phone",
    },
    {
      name: "EMAIL",
      dataKey: "_source.payload.buyer_recipient.email",
      render: (email: any) => (
        <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
          {email}
        </a>
      ),
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
    {
      name: "CANCEL DEAL",
      dataKey: "_id",
      render: (id: string) => (
        <>
          <XCircle
            color="#17c0cc"
            className={styles.cancelIcon}
            onClick={() => setShowCancelDealConfirmation(true)}
          />
          <Modal
            isOpen={showCancelDealConfirmation}
            toggle={() => setShowCancelDealConfirmation(false)}
            onCancel={() => setShowCancelDealConfirmation(false)}
            title="Cancel Deal"
            filledHeader
            onOk={() => cancelDeal(id)}
            okText="Yes, cancel deal"
            cancelText="Back"
            cancelButtonProps={{
              size: "sm",
            }}
            okButtonProps={{
              isLoading: isCancellingDeal,
              size: "sm",
            }}
          >
            <div className="text-center px-4">
              <p>Are you sure you want to cancel this pending deal?</p>
              <ThemeInput
                type="textarea"
                label="Add Comment"
                placeholder="Please specify a reason for cancelling the deal here."
                value={reason}
                onChange={(e: any) => setReason(e.target.value)}
              />
            </div>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <Table
      title="Pending Deals"
      searchable
      columns={columns}
      items={deals as Deals[]}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default PendingDeals;

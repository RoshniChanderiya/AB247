import { FundDealPayload } from "@/types/deals";
import { Pageable } from "@/types/generic";
import RestClient from "@/utils/RestClient";

export const getDeal = async (id: string) => RestClient(`/deals/${id}`);

export const getDeals = async (
  filters: {
    search?: string;
    type: "new" | "pending" | "funded" | "waiting";
  } & Pageable
) => RestClient("/deals", "GET", filters);

export const getDealCount = async (
  filters: {
    search?: string;
    type: "new" | "pending" | "funded" | "waiting";
  } & Pageable
) => RestClient("/deals/count", "GET", filters);

export const cancelDeal = async ({
  id,
  reason,
}: {
  id: string;
  reason?: string;
}) => RestClient(`/deals/${id}`, "DELETE", { reason });

export const fundDeal = ({ id, data }: { id: string; data: FundDealPayload }) =>
  RestClient(`/deals/${id}/funded`, "PUT", data);

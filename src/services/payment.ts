import { IncentivePayload } from "@/types/incentive";
import RestClient from "@/utils/RestClient";

export const getIncentivePayment = (data: IncentivePayload) =>
  RestClient("incentive/payment", "GET", data);

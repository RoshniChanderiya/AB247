import { getIncentivePayment } from "@/services/payment";
import { IncentivePayload } from "@/types/incentive";
import { QueryOptions, useQuery } from "react-query";

const QUERY_KEYS = {
  INCENTIVE_DETAILS: "incentive-details",
};

export const useIncentivePayment = (
  data: IncentivePayload,
  options?: QueryOptions
) =>
  useQuery(
    [QUERY_KEYS.INCENTIVE_DETAILS, data],
    () => getIncentivePayment(data),
    options
  );

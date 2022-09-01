import { getTrade } from "@/services/trade";
import { Trade } from "@/types/trade";
import { isUUID } from "@/utils/generic";
import { QueryOptions, useQuery, UseQueryResult } from "react-query";

const QUERY_KEYS = {
  TRADE_DETAILS: "trade-details",
};

export const useTrade = (
  id: string,
  options?: QueryOptions
): UseQueryResult<Trade> =>
  useQuery([QUERY_KEYS.TRADE_DETAILS, id], () => getTrade(id), {
    enabled: Boolean(id && isUUID(id)),
    ...options,
  });

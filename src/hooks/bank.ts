import { getBanks } from "@/services/generic";
import { Bank } from "@/types/bank";
import { QueryOptions, useQuery, UseQueryResult } from "react-query";

const QUERY_KEYS = {
  BANKS: "banks",
};

export const useBanks = (options?: QueryOptions): UseQueryResult<Bank[]> =>
  useQuery([QUERY_KEYS.BANKS], () => getBanks(), options);

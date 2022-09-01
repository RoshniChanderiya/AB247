import { getAuction } from "@/services/auction";
import {
  cancelDeal,
  fundDeal,
  getDeal,
  getDealCount,
  getDeals,
} from "@/services/deals";
import { Deals } from "@/types/deals";
import { isUUID } from "@/utils/generic";
import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

const QUERY_KEYS = {
  DEAL_DETAILS: "deal-details",
  DEAL_LIST: "deal-list",
  DEAL_COUNT: "deal-count",
  DEAL_AUCTIONS: "deal-auctions",
};

export const useDeal = (id: string, options?: QueryOptions) =>
  useQuery([QUERY_KEYS.DEAL_DETAILS, { id }], () => getDeal(id), {
    enabled: Boolean(id && isUUID(id)),
    ...options,
  });

export const useDeals = (
  filters: Parameters<typeof getDeals>[0],
  options?: Omit<
    UseQueryOptions<{ total: number; data: Deals[] }, unknown>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<{ total: number; data: Deals[] }, unknown> =>
  useQuery(
    [QUERY_KEYS.DEAL_LIST, { ...filters }],
    () => getDeals(filters),
    options
  );

export const useDealCount = (
  filters: Parameters<typeof getDeals>[0],
  options?: Omit<UseQueryOptions<number, unknown>, "queryKey" | "queryFn">
): UseQueryResult<number, unknown> =>
  useQuery(
    [QUERY_KEYS.DEAL_COUNT, { ...filters }],
    () => getDealCount(filters),
    options
  );

export const useCancelDealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(cancelDeal, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DEAL_LIST]);
    },
  });
};

export const useFundDealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(fundDeal, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DEAL_LIST]);
    },
  });
};

export const useDealAuctions = (auctionIds: string[]) =>
  useQuery(
    [QUERY_KEYS.DEAL_AUCTIONS, auctionIds],
    () => Promise.all(auctionIds.map((id) => getAuction(id))),
    {
      enabled: auctionIds.length > 0,
    }
  );

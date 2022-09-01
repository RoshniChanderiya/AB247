import {
  getAuction,
  getAuctions,
  placeBid,
  removeVehicle,
} from "@/services/auction";
import { Auction, AuctionState } from "@/types/auction";
import { isUUID } from "@/utils/generic";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

interface AuctionProp {
  search?: string;
  state: AuctionState[];
}

const QUERY_KEYS = {
  AUCTIONS: "auctions",
  BACKEND_PROFIT: "backend-profit",
};

export const useAuctions = (
  { search, state }: AuctionProp,
  options?: Omit<UseQueryOptions<Auction[], unknown>, "queryKey" | "queryFn">
): UseQueryResult<Auction[], unknown> =>
  useQuery(
    [QUERY_KEYS.AUCTIONS, { search, state }],
    () => getAuctions({ search, state }),
    options
  );

export const useAuction = (id: string) =>
  useQuery([QUERY_KEYS.AUCTIONS, { id }], () => getAuction(id), {
    enabled: Boolean(id) && isUUID(id),
  });

export const usePlaceBidMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(placeBid, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.AUCTIONS),
  });
};

export const useRemoveVehicleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(removeVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.AUCTIONS]);
    },
  });
};

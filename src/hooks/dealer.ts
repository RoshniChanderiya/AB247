import {
  createRepresentative,
  getDealer,
  getRepresentatives,
  removeRepresentative,
  saveAccountDetails,
  saveBusinessDetails,
  updateRepresentative,
} from "@/services/dealer";
import { User } from "@/types/user";
import { isUUID } from "@/utils/generic";
import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

const QUERY_KEYS = {
  DEALER_DETAILS: "dealer-details",
  DEALER_REPRESENTATIVES: "dealer-representative",
};

export const useDealer = (id: string, options?: QueryOptions) =>
  useQuery([QUERY_KEYS.DEALER_DETAILS, id], () => getDealer(id), {
    enabled: Boolean(id && isUUID(id)),
    ...options,
  });

export const useDealerRePresentatives = (
  filter: Parameters<typeof getRepresentatives>[0],
  options?: UseQueryOptions<
    unknown,
    unknown,
    { data: User[]; total: number },
    any
  >
) =>
  useQuery(
    [QUERY_KEYS.DEALER_REPRESENTATIVES, { ...filter }],
    () => getRepresentatives(filter),
    options
  );

export const useSaveBusinessDetailsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(saveBusinessDetails, {
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries([QUERY_KEYS.DEALER_DETAILS, id]);
      queryClient.refetchQueries([QUERY_KEYS.DEALER_REPRESENTATIVES]);
    },
  });
};

export const useSaveAccountDetailsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(saveAccountDetails, {
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries([QUERY_KEYS.DEALER_DETAILS, id]);
      queryClient.refetchQueries([QUERY_KEYS.DEALER_REPRESENTATIVES]);
    },
  });
};

export const useCreateRepresentativeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createRepresentative, {
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries([QUERY_KEYS.DEALER_DETAILS, id]);
      queryClient.refetchQueries([QUERY_KEYS.DEALER_REPRESENTATIVES]);
    },
  });
};

export const useUpdateRepresentativeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRepresentative, {
    onSuccess: (_, { dealerId }) => {
      queryClient.refetchQueries([QUERY_KEYS.DEALER_DETAILS, dealerId]);
      queryClient.refetchQueries([QUERY_KEYS.DEALER_REPRESENTATIVES]);
    },
  });
};

export const useRemoveRepresentativeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(removeRepresentative, {
    onSuccess: (_, { dealerId }) => {
      queryClient.refetchQueries([QUERY_KEYS.DEALER_DETAILS, dealerId]);
      queryClient.refetchQueries([QUERY_KEYS.DEALER_REPRESENTATIVES]);
    },
  });
};

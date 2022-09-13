import {
  createDeliveryVehicle,
  declineDeliveryVehicle,
  getInventory,
  getVehicle,
  getVehicleDeliveryStatus,
  getYearData,
  getYears,
  removeInventoryVehicle,
  restoreInventoryVehicle,
  updateFloorBid,
  updateInventory,
} from "@/services/vehicle";
import { VehiclePayload } from "@/types/vehicle";
import { isUUID } from "@/utils/generic";
import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

const QUERY_KEYS = {
  VEHICLE: "vehicle",
  DEAL_LIST: "deal-list",
  VEHICLE_INVENTORY: "vehicle-inventory",
  VEHICLE_YEARS: "vehicle-years",
  VEHICLE_DELIVERY_STATUS: "vehicle-delivery-status",
};

export const useVehicle = (
  id: string,
  options?: QueryOptions
): UseQueryResult<VehiclePayload> =>
  useQuery([QUERY_KEYS.VEHICLE, id], () => getVehicle(id), {
    enabled: Boolean(id && isUUID(id)),
    ...options,
  });

export const useVehicleInventory = (
  state: Parameters<typeof getInventory>[0]
) =>
  useQuery([QUERY_KEYS.VEHICLE_INVENTORY, { state }], () =>
    getInventory(state)
  );

export const useUpdateFloorBidMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFloorBid, {
    onSuccess: (_, { id }) => {
      queryClient.removeQueries([QUERY_KEYS.VEHICLE_INVENTORY]);
      queryClient.invalidateQueries([QUERY_KEYS.VEHICLE, id]);
    },
  });
};

export const useRemoveInventoryVehicleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(removeInventoryVehicle, {
    onSuccess: (_, id) => {
      queryClient.removeQueries([QUERY_KEYS.VEHICLE_INVENTORY]);
      queryClient.invalidateQueries([QUERY_KEYS.VEHICLE, id]);
    },
  });
};

export const useRestoreInventoryVehicleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(restoreInventoryVehicle, {
    onSuccess: (_, id) => {
      queryClient.removeQueries([QUERY_KEYS.VEHICLE_INVENTORY]);
      queryClient.invalidateQueries([QUERY_KEYS.VEHICLE, id]);
    },
  });
};

export const useVehicleYears = () =>
  useQuery([QUERY_KEYS.VEHICLE_YEARS], () => getYears());

export const useYearData = (year: number) =>
  useQuery([QUERY_KEYS.VEHICLE_YEARS, year], () => getYearData(year), {
    enabled: Boolean(year),
  });

export const useUpdateInventoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.VEHICLE_INVENTORY]);
      queryClient.invalidateQueries([QUERY_KEYS.VEHICLE]);
    },
  });
};

export const useCreateVehicleDeliveryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createDeliveryVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DEAL_LIST]);
    },
  });
};

export const useVehicleDeliveryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(getVehicleDeliveryStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DEAL_LIST]);
    },
  });
};

export const useDeclineVehicleDeliveryMutation = () => {
  return useMutation(declineDeliveryVehicle);
};

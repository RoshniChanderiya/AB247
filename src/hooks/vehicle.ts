import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';

import {
  createVehicleConfiguration,
  getImages,
  getVehicle,
  getVehicleConfiguration,
  getYearData,
  getYears,
} from '@/services/vehicle';
import { VehiclePayload } from '@/types/vehicle';

const QUERY_KEYS = {
  VEHICLE: 'vehicle',
  VEHICLE_INVENTORY: 'vehicle-inventory',
  VEHICLE_YEARS: 'vehicle-years',
  VEHICLE_DETAILS: 'vehicle-details',
  VEHICLE_IMAGES: 'vehicle-image',
  INVENTORY_CONFIGURATION: 'inventory-configuration',
};

export const useVehicleConfiguration = (id: string) =>
  useQuery([QUERY_KEYS.INVENTORY_CONFIGURATION, id], () => getVehicleConfiguration(id), {
    enabled: Boolean(id),
  });

export const useVehicleYears = () =>
  useQuery([QUERY_KEYS.VEHICLE_YEARS], () => getYears());

export const useYearData = (year: string) =>
  useQuery([QUERY_KEYS.VEHICLE_YEARS, year], () => getYearData(year), {
    enabled: Boolean(year),
  });

export const useVehicle = (
  id: string,
  options?: QueryOptions,
): UseQueryResult<VehiclePayload> =>
  useQuery([QUERY_KEYS.VEHICLE_DETAILS, id], () => getVehicle(id), {
    enabled: Boolean(id),
    ...options,
  });

export const useVehicleImage = (vin: string, enabled?: boolean) =>
  useQuery([QUERY_KEYS.VEHICLE_IMAGES, vin], () => getImages(vin), { enabled });

export const useCreateVehicleConfiguration = () => {
  const queryClient = useQueryClient();

  return useMutation(createVehicleConfiguration, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.INVENTORY_CONFIGURATION]);
    },
  });
};

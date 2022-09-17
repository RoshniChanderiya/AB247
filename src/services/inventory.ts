import { CreateConfigurationPayload } from '@/types/vehicle';
import RestClient from '@/utils/RestClient';

export const createInventory = (data: CreateConfigurationPayload) =>
  RestClient(`/vehicles/inventory/configuration`, 'POST', data);

export const getInventory = (id: string) =>
  RestClient(`/vehicles/inventory/configuration/${id}`, 'GET');

export const updateConfigurationInventory = (id: number) =>
  RestClient(`/vehicles/inventory/configuration/${id}`, 'POST');

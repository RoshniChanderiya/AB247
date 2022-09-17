import { CreateConfigurationPayload } from '@/types/vehicle';
import RestClient from '@/utils/RestClient';

export const createVehicleConfiguration = (data: CreateConfigurationPayload) =>
  RestClient(`/vehicles/inventory/configuration`, 'POST', data);

export const getVehicleConfiguration = (id: string) =>
  RestClient(`/vehicles/inventory/configuration/${id}`, 'GET');

export const getYears = () => RestClient('/vehicles/years');

export const getYearData = (year: string) => RestClient(`/vehicles/years/${year}`);

export const getVehicle = (id: string) => RestClient(`vehicles/${id}`);

export const getImages = (vin: string) => RestClient(`vehicles/${vin}/images`);

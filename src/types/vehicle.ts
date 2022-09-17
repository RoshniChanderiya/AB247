import invert from 'lodash/invert';

import { CAR_TYPE } from '@/constants';

import { DataModel, RefID } from './generic';
import { ColorFilter } from './generic';

export interface VehiclePayload {
  result_state: string;
  vin: string;
  mileage: number;
  price: number;
  msrp: number;
  days_on_market: number;
  distance_to_dealer: number;
  dealer_zipcode: string;
  marketscan_dealer_id: number;
  dealer_fees?: DealerFees[] | null;
  proxy_bid: number;
  floor_bid: number;
  display_name: string;
  dealer: VehicleDealer;
  uvc: string;
  model_year: string;
  make: string;
  model: string;
  series: string;
  style: string;
  dealer_state: string;
  stock_type: string;
  certified: boolean;
  engine_from_vin: string;
  drivetrain_from_vin: string;
  fuel_type_from_vin: string;
  transmission_from_vin: string;
  wheelbase_from_vin: string;
  exterior_color_category: string;
  interior_color_category: string;
  listing_first_date?: string;
}

interface DealerFees {
  description: string;
  amount: number;
  taxable: boolean;
}

interface VehicleDealer extends RefID {
  dealer_id: number;
  dealer_name: string;
  dealer_street: string;
  dealer_city: string;
  dealer_state: string;
  dealer_zipcode: string;
  dealer_url: string;
  dealer_email: string;
  dealer_phone: string;
  dealer_type: string;
}

interface VehicleKeys {
  text: string | boolean;
  count: number;
}
export interface CreateConfigurationPayload {
  zip: string;
  uvc: string;
  radius: number;
}

interface VehicleConfigurationResponse {
  keys: {
    certified: VehicleKeys[];
    dealer_state: VehicleKeys[];
    drivetrain_from_vin: VehicleKeys[];
    engine_from_vin: VehicleKeys[];
    exterior_color_category: VehicleKeys[];
    fuel_type_from_vin: VehicleKeys[];
    interior_color_category: VehicleKeys[];
    make: VehicleKeys[];
    model_year: VehicleKeys[];
    model: VehicleKeys[];
    series: VehicleKeys[];
    stock_type: VehicleKeys[];
    style: VehicleKeys[];
    transmission_from_vin: VehicleKeys[];
    uvc: VehicleKeys[];
    wheelbase_from_vin: VehicleKeys[];
  };
  search: {
    all_trims: boolean;
    dealer_stats: boolean;
    in_state: boolean;
    make: string;
    model: string;
    model_year: string;
    radius: number;
    series: string;
    style: string;
    total: number;
  };
  useId: RefID;
  uvc: string;
  zip: string;
  selected: VehiclePayload[];
}
export type VehicleConfig = DataModel<VehicleConfigurationResponse>;

export type Vehicle = DataModel<VehiclePayload>;

export type InventoryState = 'active' | 'inactive';

const CAR_TYPE_INVERT = invert(CAR_TYPE);

export type FilterSectionString = 'engine' | 'drivetrain' | 'fuelType';

export interface VehicleConfigFilter {
  details?: VehicleConfig;
  allVehicles?: VehiclePayload[];
  selectedVehicles?: VehiclePayload[];
  carType?: keyof typeof CAR_TYPE_INVERT;
  setCarType?: (type: string) => void;
  onColorFilterUpdated?: (isChecked: boolean, type: string, index: number) => void;
  interiorColorCategories?: ColorFilter[];
  exteriorColorCategories?: ColorFilter[];
  miles?: number[];
  onMilesFilter?: (newMiles: number[]) => void;
  engines?: ColorFilter[];
  drivetrain?: ColorFilter[];
  fuelType?: ColorFilter[];
  onFilterUpdate?: (type: FilterSectionString, key: string) => void;
  vehicles?: ColorFilter[];
  averageMSRP?: number;
  isLoading?: boolean;
  searchVehicle?: Record<string, string>;
}

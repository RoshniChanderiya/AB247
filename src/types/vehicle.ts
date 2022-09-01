import { DataModel } from "./generic";

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
  dealer: Dealer;
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
}

export interface DealerFees {
  description: string;
  amount: number;
  taxable: boolean;
}

export interface Dealer {
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
  id: string;
  type: string;
}

export interface Vehicle extends DataModel<VehiclePayload> {}

export type InventoryState = "active" | "inactive";

import { DataModel } from "./generic";

interface DealerPayload {
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
  lat: string;
  long: string;
  dealer_fees?: number;
  processing_fees?: number;
  dms_name?: string;
  dms_account_number?: string;
  floorplan_company?: string;
  floorplan_company_email?: string;
  bank?: {
    account_number?: string;
    address?: string;
    business_address?: string;
    business_name?: string;
    name?: string;
    routing_number?: string;
  };
}

export interface Dealer extends DataModel<DealerPayload> {}

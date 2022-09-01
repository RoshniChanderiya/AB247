import { IdType } from "./generic";
import { Product } from "./product";

export interface Jacket {
  vehicle_configuration_id: string;
  buyer: IdType;
  personal_details: PersonalDetails;
  payment_summary: PaymentSummary;
  incentive?: Incentive[] | null;
  financial_products?: Product[] | null;
  trade_in: TradeIn;
  charge_id: string;
}

export interface PersonalDetails {
  full_name: string;
  phone: string;
  shipping: Address;
  billing: Address;
  payment_method: string;
}

export interface Address {
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentSummary {
  estimated_monthly_payment: number;
  vehicle_budget: number;
  down_payment: number;
  loan_terms: number;
  interest_rate: number;
}

export interface Incentive {
  rebate_id: number;
  name: string;
  maxCreditScore: number;
  minCreditScore: number;
  startDate: string;
  stopDate: string;
  retail_amount: number;
  lease_amount: number;
  selected: boolean;
}

export interface TradeIn {
  id: string;
}

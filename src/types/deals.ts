import { AuctionVehicle } from "./auction";
import { DataModel, IdType } from "./generic";

interface DealsPayload {
  auction_id?: string;
  buyer: IdType;
  vehicle?: AuctionVehicle;
}

export interface Deals extends DataModel<DealsPayload> {}

export interface FundDealPayload {
  bank: string;
  funded: number;
  price: number;
  signed: "yes" | "no";
  terms: number;
  type: "loan" | "lease" | "cash";
  tradeIn?: "yes" | "no";
}

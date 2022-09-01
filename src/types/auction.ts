import { AUCTION_STATES } from "@/constants";
import { AuctionDataModel, IdType } from "./generic";

export interface AuctionVehicle {
  id: string;
  _id: string;
  vehicle: IdType;
  dealer: IdType;
  lat: number;
  long: number;
  floor_bid: number;
  vin: string;
  dealer_id: number;
  exterior_color_category: string;
}
interface AuctionPayload {
  vehicle_configuration_id: string;
  vehicleConfig: IdType;
  auction_start_time: number;
  auction_end_time?: number;
  auction_status: AuctionState;
  buyer: IdType;
  jacket: IdType;
  charge: number;
  current_low_bid: number;
  timer: number;
  vehicles?: AuctionVehicle[];
  vehicle?: AuctionVehicle;
  auction?: {
    winner_bids: AuctionVehicle[];
  };
}

export type AuctionState = keyof typeof AUCTION_STATES;

export interface Auction extends AuctionDataModel<AuctionPayload> {}

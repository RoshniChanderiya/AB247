export const AUCTION_AMOUNT = 500;

export const DATA_TYPES = {
  AUCTION: "auction",
  TRADE_IN: "trade_in",
  VEHICLE: "vehicle",
  VEHICLE_CONFIGURATION: "vehicle_configuration",
  BUYER: "buyer",
  DEALER: "dealer",
  TRADE: "trade",
  JACKET: "jacket",
  BIDDER: "bidder",
  BUYER_SIGNED: "buyer_signed",
  DEALER_SIGNED: "dealer_signed",
  BANKS: "banks",
};

export const AUCTION_STATES = {
  live: "live",
  scheduled: "scheduled",
  completed: "completed",
  expiring: "expiring",
};

export const LIST_VIEW_TYPE = ["grid", "table"] as const;

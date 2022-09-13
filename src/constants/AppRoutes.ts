const AvailableRoutes = ["LOGIN", "DASHBOARD", "HOME", "LIVE_AUCTIONS", "AWAITED_AUCTIONS", "SCHEDULED_AUCTIONS", "LOST_AUCTIONS", "NEW_DEALS", "PENDING_DEALS", "FUNDED_DEALS", "INVENTORY", "REMOVED_INVENTORY", "WHOLESALE"] as const

export const AppRoutes: Record<typeof AvailableRoutes[number], string> = {
  LOGIN: "/security/login",
  DASHBOARD: "/",
  HOME: "/",
  LIVE_AUCTIONS: "/auctions/live",
  AWAITED_AUCTIONS: "/auctions/expiring",
  SCHEDULED_AUCTIONS: "/auctions/scheduled",
  LOST_AUCTIONS: "/auctions/lost",
  NEW_DEALS: "/deals/new",
  PENDING_DEALS: "/deals/pending",
  FUNDED_DEALS: "/deals/funded",
  INVENTORY: "/inventory",
  REMOVED_INVENTORY: "/inventory/removed",
  WHOLESALE: "/wholesale",
};

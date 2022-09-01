import { AuctionContext } from "@/pages/Auctions";
import AuctionList from "@/pages/Auctions/List";
import React from "react";

const LiveAuction: React.FC = () => {
  return (
    <AuctionContext.Provider
      value={{
        state: "live",
        isSummary: true,
      }}
    >
      <AuctionList />
    </AuctionContext.Provider>
  );
};

export default LiveAuction;

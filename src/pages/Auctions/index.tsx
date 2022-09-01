import { AUCTION_STATES } from "@/constants";
import SocketProvider from "@/providers/SocketProvider";
import { AuctionState } from "@/types/auction";
import last from "lodash/last";
import split from "lodash/split";
import React, { Fragment, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const AuctionContext = React.createContext<{
  state: AuctionState;
  isSummary?: boolean;
}>({
  state: "scheduled",
  isSummary: false,
});

const Auctions: React.FC = () => {
  const { pathname } = useLocation();
  const state = last(split(pathname, "/")) as AuctionState;

  const Container = useMemo(
    () => (state === AUCTION_STATES.live ? SocketProvider : Fragment),
    [state]
  );
  return (
    <AuctionContext.Provider
      value={{
        state,
        isSummary: false,
      }}
    >
      {state && (
        <Container>
          <Outlet />
        </Container>
      )}
    </AuctionContext.Provider>
  );
};

export default Auctions;

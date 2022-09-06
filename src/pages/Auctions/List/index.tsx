import { AUCTION_STATES } from "@/constants";
import { useAuctions } from "@/hooks/auction";
import useWindowDimentions from "@/hooks/useWindowDimensions";
import Grid from "@/pages/Auctions/List/Grid";
import { Auction } from "@/types/auction";
import { ListViewType } from "@/types/generic";
import { organiseAuctionsByVehicle } from "@/utils/auction";
import classNames from "classnames";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { useContext, useEffect, useState } from "react";
import { AuctionContext } from "..";
import AuctionListSubHeader from "../AuctionListSubHeader";
import AuctionListContainer from "./Container";
import styles from "./styles.module.scss";
import AuctionTableView from "./Table";

const AuctionList: React.FC = () => {
  const { width } = useWindowDimentions();
  const { state, isSummary } = useContext(AuctionContext);

  const [view, setView] = useState<ListViewType>("table");

  const { data: auctionsFromAPI = [], isLoading } = useAuctions(
    {
      state: [AUCTION_STATES.expiring, AUCTION_STATES.live].includes(state)
        ? ["live", "expiring"]
        : [state],
    },
    {
      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    width < 1200 ? setView("grid") : setView("table");
  }, [width]);

  const waitingSignatureAuctions = auctionsFromAPI.filter(
    ({ payload: { auction_status, vehicles, auction } }) => {
      const winnerVehicle = get(auction, "winner_bids.0._id");
      const vehicle = vehicles?.find(({ id }) => id === winnerVehicle);
      return auction_status === "expiring" && Boolean(vehicle);
    }
  );
  const auctions = auctionsFromAPI.filter(
    ({ payload: { auction_status } }) => auction_status !== "expiring"
  );

  const underBidAuctions = auctions.filter(
    ({ payload: { current_low_bid, vehicle = { floor_bid: 0 } } }) =>
      current_low_bid < vehicle?.floor_bid
  );

  const actualAuctions =
    state === AUCTION_STATES.expiring
      ? waitingSignatureAuctions.map((auction) => {
          const winnerVehicle = get(auction, "payload.auction.winner_bids.0");
          return {
            ...auction,
            key: auction.id,
            payload: {
              ...auction.payload,
              vehicle: winnerVehicle,
            },
          };
        })
      : organiseAuctionsByVehicle(auctions, isSummary);

  const loading = isLoading;
  return (
    <div
      className={classNames(styles.auctionArea, {
        [styles.summary]: isSummary,
      })}
    >
      {!isSummary && (
        <AuctionListSubHeader
          state={state}
          view={view}
          total={{
            live: auctions.length,
            waiting: waitingSignatureAuctions.length,
          }}
          setView={setView}
          underBidCount={underBidAuctions.length}
        />
      )}
      <AuctionListContainer
        auctions={
          state === "scheduled"
            ? (orderBy(
                actualAuctions,
                "payload.vehicle.days_on_market",
                "asc"
              ) as Auction[])
            : actualAuctions
        }
        isLive={state === "live"}
      >
        {(auctions) =>
          view === "grid" ? (
            <Grid auctions={auctions} state={state} />
          ) : (
            <AuctionTableView
              auctions={auctions}
              loading={loading}
              state={state}
            />
          )
        }
      </AuctionListContainer>
    </div>
  );
};

export default AuctionList;

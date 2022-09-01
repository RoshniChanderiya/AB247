import { SocketContext } from "@/providers/SocketProvider";
import { Auction } from "@/types/auction";
import { organiseAuctionsByVehicle } from "@/utils/auction";
import { get } from "lodash";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

interface AuctionListContainerProps {
  auctions: Auction[];
  children: (auctions: Auction[]) => React.ReactNode;
  isLive?: boolean;
}

const SocketContainer: React.FC<AuctionListContainerProps> = ({
  children,
  auctions,
}) => {
  const socket = useContext(SocketContext);
  const timer = useRef<any>();
  const [actualAuction, setActualAuctions] = useState<Auction[]>(auctions);

  useEffect(() => {
    setActualAuctions(auctions);
  }, [auctions]);

  const allAuctionIdsAndVinNumbers = useMemo(
    () =>
      auctions.map((auction) => {
        const vin = get(auction, "payload.vehicle.vin");
        return `${auction.id}_${vin}`;
      }),
    [auctions]
  );

  useEffect(() => {
    if (socket?.connected) {
      const isAlreadyAssigned = socket?.hasListeners("auction:dealer-data");

      // listen only if the connection is not already assigned
      if (!isAlreadyAssigned) {
        // listen to the dealer data event
        socket.on("auction:dealer-data", (data) => {
          setActualAuctions(organiseAuctionsByVehicle(data));
        });
      }

      // get data on initial load
      socket.emit("auction:get-dealer-data", allAuctionIdsAndVinNumbers);
      // trigger get dealer data every 5 seconds
      timer.current = setInterval(
        () =>
          socket.emit("auction:get-dealer-data", allAuctionIdsAndVinNumbers),
        5000
      );

      return () => {
        clearInterval(timer.current);
      };
    }
  }, [socket, allAuctionIdsAndVinNumbers]);

  return <>{children(actualAuction)}</>;
};

const BlankContainer: React.FC<AuctionListContainerProps> = ({
  children,
  auctions,
}) => {
  return <>{children(auctions)}</>;
};

const AuctionListContainer: React.FC<AuctionListContainerProps> = ({
  children,
  auctions,
  isLive,
}) => {
  const Container = isLive ? SocketContainer : BlankContainer;
  return (
    <Container auctions={auctions}>
      {(actualAuctions) => children(actualAuctions)}
    </Container>
  );
};

export default AuctionListContainer;

import { useDealer, useDealerRePresentatives } from "@/hooks/dealer";
import useAuth from "@/hooks/useAuth";
import { Dealer } from "@/types/dealer";
import { User } from "@/types/user";
import { isUUID } from "@/utils/generic";
import first from "lodash/first";
import React from "react";

interface SocketProviderProps {
  id?: string;
  children: React.ReactNode;
}

export const OnboardingContext = React.createContext<{
  dealer?: Dealer;
  admin?: User;
}>({});

const OnboardingProvider: React.FC<SocketProviderProps> = ({
  id,
  children,
}) => {
  const {
    user: {
      dealer: { id: dealerId },
    },
  } = useAuth();
  
  const { isLoading, data: dealerDetails } = useDealer(dealerId);

  const { isLoading: isFetchingBidder, data: bidders } =
    useDealerRePresentatives(
      {
        id: dealerId,
        limit: 1,
        role: "manager",
      },
      {
        enabled: Boolean(dealerId) && isUUID(dealerId),
      }
    );

  return (
    <OnboardingContext.Provider
      value={{
        dealer: dealerDetails as Dealer,
        admin: first(bidders?.data),
      }}>
      {(isLoading || isFetchingBidder) && <>Loading...</>}
      {!isLoading && !isFetchingBidder && children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;

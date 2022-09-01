import FloorPriceInput, {
  FloorPriceInputProps,
  FloorPriceRef,
} from "@/components/FloorPriceInput";
import { usePlaceBidMutation } from "@/hooks/auction";
import { Auction } from "@/types/auction";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import get from "lodash/get";
import React, { Ref, useImperativeHandle } from "react";

interface FloorPriceProps extends Omit<FloorPriceInputProps, "onPlaceBid"> {
  auction: Auction;
  inputRef?: Ref<FloorPriceRef>;
  showCurrentBid?: boolean;
}

export interface FloorPriceContainerRef {
  placeBid: (amount: number) => Promise<void>;
}

const FloorPrice: React.ForwardRefRenderFunction<
  FloorPriceContainerRef,
  FloorPriceProps
> = ({ auction, showCurrentBid, inputRef, ...props }, ref) => {
  const vehicles = get(auction, "payload.vehicles", []);
  const floorPrice = get(
    auction,
    showCurrentBid ? "payload.current_low_bid" : "payload.vehicle.floor_bid",
    ""
  );
  const vin = get(vehicles, "0.vin", "");
  const { mutateAsync: placeBidMutation, isLoading: isPlacingBid } =
    usePlaceBidMutation();
  /**
   * Place bid for the vehicle into the auction
   */
  const placeBid = async (floorBid: number) => {
    const auctionId = get(auction, "id");
    try {
      await placeBidMutation({
        vin,
        auctionId,
        bidAmount: floorBid.toString(),
      });
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

  useImperativeHandle(ref, () => ({
    placeBid,
  }));

  return (
    <FloorPriceInput
      floorPrice={floorPrice}
      isPlacingBid={isPlacingBid}
      onPlaceBid={placeBid}
      ref={inputRef}
      {...props}
    />
  );
};

export default React.forwardRef(FloorPrice);

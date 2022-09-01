import { Auction } from "@/types/auction";
import { Deals } from "@/types/deals";
import { DataModel } from "@/types/generic";
import get from "lodash/get";

export const organiseAuctionsByVehicle = (
  auctions: Auction[],
  isSummary?: boolean
): Auction[] => {
  const newAuctions: Auction[] = [];
  for (const auction of auctions) {
    const vehicles = get(auction, "payload.vehicles", []);
    for (const vehicle of vehicles) {
      const currentAuction = {
        ...auction,
        payload: {
          ...auction.payload,
          vehicle,
        },
        key: `${auction.id}_${vehicle.id}_${vehicle.vin}`,
      };
      newAuctions.push(currentAuction);
    }
  }
  return isSummary ? newAuctions.splice(0, 5) : newAuctions;
};
/**
 * form a list of auction object similar to the one returned by the API for auction/list by deals and datamodel
 * @param deals
 * @param auctions
 * @returns {Auction[]}
 */
export const formAuctionObjectFromDataModel = (
  deals: Deals[],
  auctions: DataModel<any>[]
) =>
  deals
    .map((deal: Deals) => {
      const currentAuction = auctions.find(
        ({
          _source: {
            payload: {
              jacket: { id },
            },
          },
        }) => id === deal._id
      );

      if (!currentAuction) {
        return undefined;
      }
      return {
        _id: currentAuction._id,
        id: currentAuction._id,
        _index: currentAuction._index,
        created: currentAuction._source.created,
        created_by: currentAuction._source.created_by,
        group: currentAuction._source.group,
        payload: {
          ...currentAuction._source.payload,
          vehicle: deal._source.payload.vehicle,
        },
        updated: currentAuction._source.updated,
        updated_by: currentAuction._source.updated_by,
        role: currentAuction._source.role,
        state: currentAuction._source.state,
        status: currentAuction._source.status,
        type: currentAuction._source.type,
      };
    })
    .filter(Boolean);

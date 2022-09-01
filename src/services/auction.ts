import { Pageable } from "@/types/generic";
import RestClient from "@/utils/RestClient";

export const getAuctions = async (
  data: { search?: string; state: string[] } & Pageable
) => RestClient("/dealers/auctions", "GET", data);

export const getAuction = async (id: string) =>
  RestClient(`/dealers/auctions/${id}`);

export const placeBid = ({
  auctionId,
  bidAmount,
  vin,
}: {
  auctionId: string;
  bidAmount: string;
  vin: string;
}) =>
  RestClient(`/dealers/auctions/${auctionId}/floor`, "PUT", {
    amount: Number(bidAmount),
    vin,
  });

export const removeVehicle = ({
  auctionId,
  vehicleId,
}: {
  auctionId: string;
  vehicleId: string;
}) => RestClient(`/dealers/auctions/${auctionId}/${vehicleId}`, "DELETE");

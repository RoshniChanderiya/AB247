import RestClient from "@/utils/RestClient";

export const getVehicle = (id: string) => RestClient(`vehicles/${id}`);

export const getInventory = ({
  state,
  limit,
  offset,
}: {
  state: "active" | "inactive";
  limit?: number;
  offset?: number;
}) => RestClient(`vehicles/inventory`, "GET", { state, limit, offset });

export const updateFloorBid = ({
  amount,
  id,
}: {
  amount: number;
  id: string;
}) => RestClient(`vehicles/${id}/floor`, "PUT", { amount });

export const removeInventoryVehicle = (id: string) =>
  RestClient(`vehicles/${id}`, "DELETE");

export const restoreInventoryVehicle = (id: string) =>
  RestClient(`vehicles/${id}`, "PUT");

export const getYears = () => RestClient("/vehicles/years");

export const getYearData = (year: number) =>
  RestClient(`/vehicles/years/${year}`);

export const createDeliveryVehicle = ({
  payload,
  id,
}: {
  payload: any;
  id: string;
}) => RestClient(`/deals/${id}/delivery`, "POST", payload);

export const getVehicleDeliveryStatus = (id: string) =>
  RestClient(`deals/${id}/delivery/status`, "GET");

export const declineDeliveryVehicle = ({ id }: { id: string }) =>
  RestClient(`/deals/${id}/delivery/decline`, "PUT");

export const updateInventory = (uvc: string) =>
  RestClient(`vehicles/inventory`, "PUT", { uvc });

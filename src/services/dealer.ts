import { Dealer } from "@/types/dealer";
import { User } from "@/types/user";
import { getSnakeCaseVersion } from "@/utils/generic";
import RestClient from "@/utils/RestClient";

export const getDealer = (id: string): Promise<Dealer> =>
  RestClient(`/dealers/${id}`);

export const getRepresentatives = ({
  id,
  role,
  offset,
  limit,
}: {
  id: string;
  offset?: number;
  limit?: number;
  role?: "manager" | "bidder";
}): Promise<any> =>
  RestClient(`/dealers/${id}/representatives`, "GET", { role, offset, limit });

export const saveBusinessDetails = ({ id, data }: { id: string; data: any }) =>
  RestClient(`/dealers/${id}/onboard/business`, "PUT", data);

export const saveAccountDetails = ({ id, data }: { id: string; data: any }) =>
  RestClient(`/dealers/${id}/onboard/account`, "PUT", data);

export const createRepresentative = ({
  id,
  data,
}: {
  id: string;
  data: User["_source"]["payload"];
}) =>
  RestClient(
    `/dealers/${id}/representatives`,
    "POST",
    getSnakeCaseVersion(data)
  );

export const updateRepresentative = ({
  id,
  dealerId,
  data,
}: {
  id: string;
  dealerId: string;
  data: User["_source"]["payload"];
}) =>
  RestClient(
    `/dealers/${dealerId}/representatives/${id}`,
    "PUT",
    getSnakeCaseVersion(data)
  );

export const removeRepresentative = ({
  id,
  dealerId,
}: {
  id: string;
  dealerId: string;
}) => RestClient(`/dealers/${dealerId}/representatives/${id}`, "DELETE");

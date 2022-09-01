import { getUser } from "@/services/user";
import { User } from "@/types/user";
import { isUUID } from "@/utils/generic";
import { QueryOptions, useQuery, UseQueryResult } from "react-query";

const QUERY_KEYS = {
  USER_DETAILS: "user-details",
};

export const useUser = (
  id: string,
  options?: QueryOptions
): UseQueryResult<User> =>
  useQuery([QUERY_KEYS.USER_DETAILS, id], () => getUser(id), {
    enabled: Boolean(id && isUUID(id)),
    ...options,
  });

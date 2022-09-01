import { getHeaderCount } from "@/services/analytics";
import { useQuery } from "react-query";

const QUERY_KEYS = {
  HEADER_COUNT: "header-count",
};

export const useHeaderCount = () =>
  useQuery([QUERY_KEYS.HEADER_COUNT], () => getHeaderCount(), {
    refetchInterval: 5000,
  });

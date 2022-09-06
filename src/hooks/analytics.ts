import { getHeaderCount } from "@/services/analytics";
import { Analytics } from "@/types/generic";
import { useQuery, UseQueryOptions } from "react-query";

const QUERY_KEYS = {
  HEADER_COUNT: "header-count",
};

export const useHeaderCount = (
  option?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Analytics,
      string[]
    >,
    "queryKey" | "queryFn"
  >
) =>
  useQuery([QUERY_KEYS.HEADER_COUNT], () => getHeaderCount(), {
    ...option,
    refetchInterval: 5000,
  });

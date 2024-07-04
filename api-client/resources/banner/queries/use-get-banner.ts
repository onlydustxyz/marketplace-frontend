import { useSuspenseQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import { getBanner } from "../fetch";
import { GetBannerResponse } from "../types";

export const useGetBanner = ({ options }: { options?: ReactQueryOptions } = {}) => {
  const { query } = useReactQueryAdapter<GetBannerResponse>(getBanner(), options);

  return useSuspenseQuery<GetBannerResponse>(query);
};

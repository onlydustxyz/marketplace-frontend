import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getBanner } from "../fetch";
import { GetBannerResponse } from "../types";

export const useGetBanner = ({ options, queryParams }: ParametersInterfaceWithReactQuery<typeof getBanner>) => {
  const { query } = useReactQueryAdapter<GetBannerResponse>(getBanner({ queryParams }));

  return useQuery<GetBannerResponse>({
    ...query,
    ...options,
  });
};

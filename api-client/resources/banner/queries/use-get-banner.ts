import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getBanner } from "../fetch";
import { GetBannerResponse } from "../types";

export const useGetIssueById = ({ options }: ParametersInterfaceWithReactQuery<typeof getBanner>) => {
  const { query } = useReactQueryAdapter<GetBannerResponse>(getBanner(), options);

  return useQuery<GetBannerResponse>(query);
};

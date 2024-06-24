"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicEcosystems } from "api-client/resources/users/fetch";
import { UserPublicEcosystemsResponse } from "api-client/resources/users/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetUserPublicEcosystemsByGithubId = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getUserPublicEcosystems>) => {
  const { query } = useReactQueryAdapter<UserPublicEcosystemsResponse>(getUserPublicEcosystems(fetch), options);

  return useQuery<UserPublicEcosystemsResponse>(query);
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicProfileByGithubId } from "api-client/resources/users/fetch/get-user-public-profile-by-github-id";
import { UserPublicProfileResponseV2 } from "api-client/resources/users/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetUserPublicProfileByGithubId = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getUserPublicProfileByGithubId>) => {
  const { query } = useReactQueryAdapter<UserPublicProfileResponseV2>(getUserPublicProfileByGithubId(fetch), options);

  return useQuery<UserPublicProfileResponseV2>(query);
};

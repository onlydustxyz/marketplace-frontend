"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicProfileByGithubId } from "api-client/resources/users/fetch/get-user-public-profile-by-github-id";
import { UserPublicProfileResponseV2 } from "api-client/resources/users/types";

export const useGetUserPublicProfileByGithubId = ({
  githubId,
  isEnabled = true,
}: {
  githubId: number;
  isEnabled?: boolean;
}) => {
  const { query } = useReactQueryAdapter<UserPublicProfileResponseV2>(getUserPublicProfileByGithubId(githubId));
  const { isAuthenticated } = useAuth0();

  return useQuery<UserPublicProfileResponseV2>({
    ...query,
    enabled: isAuthenticated && isEnabled,
  });
};

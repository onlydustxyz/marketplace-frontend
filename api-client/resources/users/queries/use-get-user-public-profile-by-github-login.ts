"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicProfileByGithubLogin } from "api-client/resources/users/fetch";
import { UserPublicProfileResponse } from "api-client/resources/users/types";

export const useGetUserPublicProfileByGithubLogin = (githubLogin: string) => {
  const { query } = useReactQueryAdapter<UserPublicProfileResponse>(getUserPublicProfileByGithubLogin(githubLogin));
  const { isAuthenticated } = useAuth0();

  return useQuery<UserPublicProfileResponse>({
    ...query,
    enabled: isAuthenticated,
  });
};

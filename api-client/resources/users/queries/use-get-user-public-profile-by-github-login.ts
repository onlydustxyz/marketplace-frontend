"use client";

import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicProfileByGithubLogin } from "api-client/resources/users/fetch";
import { UserPublicProfileResponseV2 } from "api-client/resources/users/types";

interface Options extends Omit<QueryObserverOptions<UserPublicProfileResponseV2>, "queryKey" | "queryFn"> {}

export const useGetUserPublicProfileByGithubLogin = (githubLogin: string, options: Options) => {
  const { query } = useReactQueryAdapter<UserPublicProfileResponseV2>(getUserPublicProfileByGithubLogin(githubLogin));

  return useQuery<UserPublicProfileResponseV2>({
    ...query,
    ...options,
  });
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getUserPublicLanguages } from "api-client/resources/users/fetch";
import { UserPublicLanguagesResponse } from "api-client/resources/users/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetUserPublicLanguagesByGithubId = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getUserPublicLanguages>) => {
  const { query } = useReactQueryAdapter<UserPublicLanguagesResponse>(getUserPublicLanguages(fetch), options);

  return useQuery<UserPublicLanguagesResponse>(query);
};

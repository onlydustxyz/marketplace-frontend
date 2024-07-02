"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getApplicationById } from "../fetch";
import { GetApplicationResponse } from "../types";

export const useGetApplicationById = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getApplicationById>) => {
  const { isAuthenticated } = useAuth0();

  const { query } = useReactQueryAdapter<GetApplicationResponse>(getApplicationById(fetch), {
    enabled: isAuthenticated,
    ...options,
  });

  return useQuery<GetApplicationResponse>(query);
};

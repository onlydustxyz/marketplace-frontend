"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyJourney } from "api-client/resources/me/fetch/get-my-journey";
import { GetMyJourneyResponse } from "api-client/resources/me/types";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export const useGetMyJourney = ({ options }: ParametersInterfaceWithReactQuery<typeof getMyJourney>) => {
  // export const useGetMyJourney = ({ options = {} }: { options?: ReactQueryOptions }) => {
  const { isAuthenticated } = useAuth0();
  const { query } = useReactQueryAdapter<GetMyJourneyResponse>(getMyJourney(), {
    enabled: isAuthenticated,
    ...options,
  });

  return useQuery<GetMyJourneyResponse>(query);
};

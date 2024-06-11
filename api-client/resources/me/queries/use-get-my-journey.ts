"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyJourney } from "api-client/resources/me/fetch/get-my-journey";
import { GetMyJourneyResponse } from "api-client/resources/me/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetMyJourney = ({ options = {} }: { options?: ReactQueryOptions }) => {
  const { query } = useReactQueryAdapter<GetMyJourneyResponse>(getMyJourney(), options);

  const { isAuthenticated } = useAuth0();

  return useQuery<GetMyJourneyResponse>({
    ...query,
    enabled: isAuthenticated,
  });
};

"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyJourney } from "api-client/resources/me/fetch/get-my-journey";
import { GetMyJourneyResponse } from "api-client/resources/me/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetMyJourney = ({ options = {} }: { options?: ReactQueryOptions }) => {
  const { query } = useReactQueryAdapter<GetMyJourneyResponse>(getMyJourney(), options);

  return useSuspenseQuery<GetMyJourneyResponse>(query);
};

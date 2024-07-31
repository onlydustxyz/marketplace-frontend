"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyOnboarding } from "api-client/resources/me/fetch/get-my-onboarding";
import { GetMyOnboardingResponse } from "api-client/resources/me/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetMyOnboarding = ({ options = {} }: { options?: ReactQueryOptions }) => {
  const { isAuthenticated } = useAuth0();
  const { query } = useReactQueryAdapter<GetMyOnboardingResponse>(getMyOnboarding(), {
    enabled: isAuthenticated,
    ...options,
  });

  return useQuery<GetMyOnboardingResponse>(query);
};

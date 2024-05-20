"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getCommitteeProjectApplication } from "api-client/resources/committees/fetch";
import { GetCommitteeProjectApplicationResponse } from "api-client/resources/committees/types";

export const useGetCommitteeProjectApplication = (params: Parameters<typeof getCommitteeProjectApplication>[0]) => {
  const { query } = useReactQueryAdapter<GetCommitteeProjectApplicationResponse>(
    getCommitteeProjectApplication(params)
  );
  const { isAuthenticated } = useAuth0();

  return useQuery<GetCommitteeProjectApplicationResponse>({
    ...query,
    enabled: isAuthenticated,
  });
};

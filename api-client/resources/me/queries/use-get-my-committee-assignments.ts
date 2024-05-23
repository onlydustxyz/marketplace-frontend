"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyCommitteeAssignments } from "api-client/resources/me/fetch/get-my-committee-assignments";
import { GetMyCommitteeAssignmentsResponse } from "api-client/resources/me/types";

export const useGetMyCommitteeAssignments = (params: Parameters<typeof getMyCommitteeAssignments>[0]) => {
  const { query } = useReactQueryAdapter<GetMyCommitteeAssignmentsResponse>(getMyCommitteeAssignments(params));
  const { isAuthenticated } = useAuth0();

  return useQuery<GetMyCommitteeAssignmentsResponse>({
    ...query,
    enabled: Boolean(params) && isAuthenticated,
  });
};

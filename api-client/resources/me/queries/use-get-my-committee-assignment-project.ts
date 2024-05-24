"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getMyCommitteeAssignmentProject } from "api-client/resources/me/fetch/get-my-committee-assignment-project";
import { GetMyCommitteeAssignmentResponse } from "api-client/resources/me/types";

type Params = Parameters<typeof getMyCommitteeAssignmentProject>;

export const useGetMyCommitteeAssignmentProject = (committeeId: Params[0], projectId: Params[1]) => {
  const { query } = useReactQueryAdapter<GetMyCommitteeAssignmentResponse>(
    getMyCommitteeAssignmentProject(committeeId, projectId)
  );
  const { isAuthenticated } = useAuth0();

  return useQuery<GetMyCommitteeAssignmentResponse>({
    ...query,
    enabled: Boolean(committeeId) && Boolean(projectId) && isAuthenticated,
  });
};

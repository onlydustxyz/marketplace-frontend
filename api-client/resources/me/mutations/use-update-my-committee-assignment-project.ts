"use client";

import type { DefaultError } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { useInvalidateQuery } from "api-client/invalidate/use-invalidate-query";

import { updateMyCommitteeAssignmentProject } from "../fetch";
import tags from "../tags";
import { UpdateMyCommitteeAssignmentParams, UpdateMyCommitteeAssignmentVariables } from "../types";

export const useUpdateCommitteeProjectApplication = ({ committeeId, projectId }: UpdateMyCommitteeAssignmentParams) => {
  const { mutation } = useReactQueryAdapter(updateMyCommitteeAssignmentProject({ committeeId, projectId }));
  const { invalidateQuery } = useInvalidateQuery();

  return useMutation<unknown, DefaultError, UpdateMyCommitteeAssignmentVariables>({
    ...mutation,
    onSuccess: () => {
      invalidateQuery(tags.committee(committeeId));
      invalidateQuery(tags.committeeProject(committeeId, projectId));
    },
  });
};

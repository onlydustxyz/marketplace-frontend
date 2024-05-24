"use client";

import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import { updateMyCommitteeAssignmentProject } from "../fetch";
import tags from "../tags";
import { UpdateMyCommitteeAssignmentParams, UpdateMyCommitteeAssignmentVariables } from "../types";

export const useUpdateCommitteeProjectApplication = ({ committeeId, projectId }: UpdateMyCommitteeAssignmentParams) => {
  const { mutation } = useReactQueryAdapter(updateMyCommitteeAssignmentProject({ committeeId, projectId }));
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, UpdateMyCommitteeAssignmentVariables>({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [tags.committeeProject(committeeId, projectId)],
        exact: false,
      });
    },
  });
};

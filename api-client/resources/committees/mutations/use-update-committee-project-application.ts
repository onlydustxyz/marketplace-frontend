"use client";

import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { committeeApiClient } from "api-client/resources/committees";
import { updateCommitteeProjectApplication } from "api-client/resources/committees/fetch/update-committee-project-application";

import { UpdateCommitteeProjectApplicationParams, UpdateCommitteeProjectApplicationVariables } from "../types";

export const useUpdateCommitteeProjectApplication = ({
  committeeId,
  projectId,
}: UpdateCommitteeProjectApplicationParams) => {
  const { mutation } = useReactQueryAdapter(updateCommitteeProjectApplication({ committeeId, projectId }));
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, UpdateCommitteeProjectApplicationVariables>({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [committeeApiClient.tags.project_application(committeeId, projectId)],
        exact: false,
      });
    },
  });
};

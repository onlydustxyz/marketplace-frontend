"use client";

import type { DefaultError } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { useInvalidateQuery } from "api-client/invalidate/use-invalidate-query";
import { committeeApiClient } from "api-client/resources/committees";
import { updateCommitteeProjectApplication } from "api-client/resources/committees/fetch/update-committee-project-application";

import { UpdateCommitteeProjectApplicationParams, UpdateCommitteeProjectApplicationVariables } from "../types";

export const useUpdateCommitteeProjectApplication = (
  { committeeId, projectId }: UpdateCommitteeProjectApplicationParams,
  options?: { onSuccess?: () => void }
) => {
  const { mutation } = useReactQueryAdapter(updateCommitteeProjectApplication({ committeeId, projectId }));
  const { invalidateQuery } = useInvalidateQuery();

  return useMutation<unknown, DefaultError, UpdateCommitteeProjectApplicationVariables>({
    ...mutation,
    onSuccess: async () => {
      await invalidateQuery(committeeApiClient.tags.project_application(committeeId, projectId));
      options?.onSuccess?.();
    },
  });
};

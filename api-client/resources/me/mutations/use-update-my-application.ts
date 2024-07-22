import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";
import { bootstrap } from "core/bootstrap";

import { PROJECT_TAGS } from "src/api/Project/tags";

import { updateMyApplication } from "../fetch/update-my-application";
import { ProjectApplicationUpdateRequest } from "../types";

export function useUpdateMyApplication(
  { options, ...fetch }: ParametersInterfaceWithReactQuery<typeof updateMyApplication>,
  projectId: string
) {
  const { mutation } = useReactQueryAdapter(updateMyApplication(fetch), options);
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, ProjectApplicationUpdateRequest>({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });
      const projectStoragePort = bootstrap.getProjectStoragePortForClient();
      await queryClient.invalidateQueries({
        queryKey: [projectStoragePort.getProjectPublicIssues({ pathParams: { projectId } }).tag],
        exact: false,
      });
    },
  });
}

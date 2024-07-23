import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { bootstrap } from "core/bootstrap";

import { PROJECT_TAGS } from "src/api/Project/tags";

import { postMyApplication } from "../fetch";
import { PostProjectApplicationCreateRequest } from "../types";

export function usePostMyApplication({ projectId }: { projectId: string }) {
  const { mutation } = useReactQueryAdapter(postMyApplication());
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, PostProjectApplicationCreateRequest>({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });
      const projectStoragePort = bootstrap.getProjectStoragePortForClient();
      await queryClient.invalidateQueries({
        queryKey: projectStoragePort.getProjectPublicIssues({ pathParams: { projectId } }).tag,
        exact: false,
      });
    },
  });
}

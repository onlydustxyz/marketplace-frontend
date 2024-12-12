import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import ApplicationTags from "api-client/resources/applications/tags";
import { bootstrap } from "core/bootstrap";

import { PROJECT_TAGS } from "src/api/Project/tags";
import { ME_TAGS } from "src/api/me/tags";

import { postMyApplication } from "../fetch";
import { PostProjectApplicationCreateRequest } from "../types";

export function usePostMyApplication({ projectId }: { projectId: string }) {
  const { mutation } = useReactQueryAdapter(postMyApplication());
  const queryClient = useQueryClient();
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const meStoragePort = bootstrap.getUserStoragePortForClient();

  return useMutation<unknown, DefaultError, PostProjectApplicationCreateRequest>({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: projectStoragePort.getProjectPublicIssues({ pathParams: { projectId } }).tag,
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: [ApplicationTags.get_all({})],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: meStoragePort.getMe({}).tag,
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ME_TAGS.all,
        exact: false,
      });
    },
  });
}

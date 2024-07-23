import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { deleteApplication } from "api-client/resources/applications/fetch";
import ApplicationTags from "api-client/resources/applications/tags";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";
import { bootstrap } from "core/bootstrap";

import { PROJECT_TAGS } from "src/api/Project/tags";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useDeleteApplication(
  { options, ...fetch }: ParametersInterfaceWithReactQuery<typeof deleteApplication>,
  projectId: string
) {
  const { mutation } = useReactQueryAdapter(deleteApplication(fetch), options);
  const queryClient = useQueryClient();
  const { githubUserId: applicantId } = useCurrentUser();

  return useMutation({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [ApplicationTags.get_all({ applicantId })],
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

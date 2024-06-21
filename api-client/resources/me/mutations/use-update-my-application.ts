import type { DefaultError } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import { PROJECT_TAGS } from "src/api/Project/tags";

import { updateMyApplication } from "../fetch/update-my-application";
import { ProjectApplicationUpdatePathParams, ProjectApplicationUpdateRequest } from "../types";

export function useUpdateMyApplication({
  fetch,
  projectId,
}: {
  fetch: { pathParams: ProjectApplicationUpdatePathParams };
  projectId: string;
}) {
  const { mutation } = useReactQueryAdapter(updateMyApplication(fetch), {
    invalidatesTags: [{ queryKey: PROJECT_TAGS.good_first_issues(projectId), exact: false }],
  });

  return useMutation<unknown, DefaultError, ProjectApplicationUpdateRequest>(mutation);
}

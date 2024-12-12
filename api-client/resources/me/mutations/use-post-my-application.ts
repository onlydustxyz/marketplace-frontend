import type { DefaultError } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import { useShowToaster } from "src/hooks/useToaster";

import { useIntl } from "hooks/translate/use-translate";

import { postMyApplication } from "../fetch";
import { PostProjectApplicationCreateRequest } from "../types";

export function usePostMyApplication() {
  const { mutation } = useReactQueryAdapter(postMyApplication());
  const queryClient = useQueryClient();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  return useMutation<unknown, DefaultError, PostProjectApplicationCreateRequest>({
    ...mutation,
    onSuccess: () => {
      queryClient.clear();

      showToaster(T("v2.features.projects.applyIssueDrawer.toaster.createSuccess"));
    },
  });
}

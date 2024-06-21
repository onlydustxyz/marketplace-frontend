import type { DefaultError } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import { postMyApplication } from "../fetch";
import { PostProjectApplicationCreateRequest } from "../types";

export function usePostMyApplication() {
  const { mutation } = useReactQueryAdapter(postMyApplication());

  return useMutation<unknown, DefaultError, PostProjectApplicationCreateRequest>(mutation);
}

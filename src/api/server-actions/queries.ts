import { useAuth0 } from "@auth0/auth0-react";

import { SERVER_ACTION_PATH as PATH } from "src/api/server-actions/path";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

const useGenerateInvoices = ({ options = {} }: UseQueryProps<File, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<File>({
    resourcePath: PATH.GENERATE_INVOICE,
    tags: [],
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGenerateInvoices,
};

import { useState } from "react";
import { onError } from "@apollo/client/link/error";

import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

enum GraphQLErrorMessage {
  ConnectionError = "connection error",
}

export default function useErrorLink() {
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const [, setState] = useState();

  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (graphQLErrors.find(graphQLError => graphQLError.message === GraphQLErrorMessage.ConnectionError)) {
        return forward(operation);
      }

      switch ((operation.getContext().graphqlErrorDisplay || DEFAULT_ERROR_DISPLAY) as ErrorDisplay) {
        case "screen":
          setState(() => {
            throw graphQLErrors;
          });
          break;
        case "toaster":
          showToaster(T("state.errorOccured"), { isError: true });
          break;
        default:
          break;
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
}

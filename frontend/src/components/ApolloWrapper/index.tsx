import { PropsWithChildren, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import config from "src/config";
import ErrorFallback from "../ErrorFallback";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useToaster } from "src/hooks/useToaster/useToaster";
import { useIntl } from "src/hooks/useIntl";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [displayError, setDisplayError] = useState(false);
  const { tokenSet } = useTokenSet();
  const { showToaster } = useToaster();
  const { T } = useIntl();

  const AuthenticationLink = setContext((_, { headers }) => {
    const authorizationHeaders = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : {};
    return {
      headers: {
        ...headers,
        ...authorizationHeaders,
      },
    };
  });

  const HttpLink = createHttpLink({
    uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  });

  const ErrorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );

      switch ((operation.getContext().graphqlErrorDisplay || DEFAULT_ERROR_DISPLAY) as ErrorDisplay) {
        case "screen":
          setDisplayError(true);
          break;
        case "toaster":
          showToaster(T("state.errorOccured"), { isError: true });
          break;
        default:
          break;
      }
    }

    if (networkError) {
      setDisplayError(true);
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([ErrorLink, AuthenticationLink, HttpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <>
      {displayError && <ErrorFallback />}
      {!displayError && <ApolloProvider client={client}>{children}</ApolloProvider>}
    </>
  );
};

export default ApolloWrapper;

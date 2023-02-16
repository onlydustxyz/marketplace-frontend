import { PropsWithChildren, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  SuspenseCache,
  disableFragmentWarnings,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import config from "src/config";
import ErrorFallback from "../ErrorFallback";
import { LOCAL_STORAGE_TOKEN_SET_KEY } from "src/hooks/useTokenSet";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

disableFragmentWarnings();

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [displayError, setDisplayError] = useState(false);
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const AuthenticationLink = setContext((_, { headers }) => {
    try {
      const tokenSetString = localStorage.getItem(LOCAL_STORAGE_TOKEN_SET_KEY);
      const tokenSet = tokenSetString ? JSON.parse(tokenSetString) : undefined;
      const authorizationHeaders = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : {};
      return {
        headers: {
          ...headers,
          ...authorizationHeaders,
        },
      };
    } catch (e) {
      console.error(`Error parsing token set: ${e}`);
      return { headers };
    }
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
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([ErrorLink, AuthenticationLink, HttpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        ProjectDetails: {
          keyFields: ["projectId"],
        },
      },
    }),
  });

  const suspenseCache = new SuspenseCache();

  return (
    <>
      {displayError && <ErrorFallback />}
      {!displayError && (
        <ApolloProvider client={client} suspenseCache={suspenseCache}>
          {children}
        </ApolloProvider>
      )}
    </>
  );
};

export default ApolloWrapper;

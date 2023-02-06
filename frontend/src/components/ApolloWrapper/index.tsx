import { PropsWithChildren, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  split,
  SuspenseCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import config from "src/config";
import ErrorFallback from "../ErrorFallback";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { getMainDefinition } from "@apollo/client/utilities";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [displayError, setDisplayError] = useState(false);
  const { tokenSet } = useTokenSet();
  const showToaster = useShowToaster();
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

  const WsLink = new GraphQLWsLink(
    createClient({
      url: `${config.HASURA_BASE_WS_URL}/v1/graphql`,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${tokenSet?.accessToken}`,
        },
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    WsLink,
    HttpLink
  );

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
    link: ApolloLink.from([ErrorLink, AuthenticationLink, splitLink]),
    cache: new InMemoryCache(),
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

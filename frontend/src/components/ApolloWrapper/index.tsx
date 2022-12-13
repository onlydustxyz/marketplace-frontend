import { PropsWithChildren, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import config from "src/config";
import { useAuth } from "src/hooks/useAuth";
import ErrorFallback from "../ErrorFallback";

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [displayError, setDisplayError] = useState(false);
  const { getUpToDateHasuraToken } = useAuth();

  const AuthenticationLink = setContext(async (_, { headers }) => {
    const hasuraToken = await getUpToDateHasuraToken();
    const authorizationHeaders = hasuraToken ? { Authorization: `Bearer ${hasuraToken.accessToken}` } : {};
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

  const ErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
    setDisplayError(true);
  });

  const client = new ApolloClient({
    link: ApolloLink.from([ErrorLink, AuthenticationLink, HttpLink]),
    cache: new InMemoryCache(),
  });

  return <>{displayError ? <ErrorFallback /> : <ApolloProvider client={client}>{children}</ApolloProvider>}</>;
};

export default ApolloWrapper;

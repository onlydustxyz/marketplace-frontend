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
import { accessTokenExpired, LOCAL_STORAGE_TOKEN_SET_KEY, useTokenSet } from "src/hooks/useTokenSet";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { TokenSet } from "src/types";
import axios from "axios";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

disableFragmentWarnings();

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [displayError, setDisplayError] = useState(false);
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const { tokenSet, setTokenSet, setHasRefreshError } = useTokenSet();

  const TokenLink = new TokenRefreshLink<TokenSet>({
    accessTokenField: "hasura_token",
    isTokenValidOrUndefined: () => {
      return (tokenSet && !accessTokenExpired(tokenSet)) || typeof tokenSet?.accessToken !== "string";
    },
    fetchAccessToken: async () => {
      const tokenSetResponse = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
        refreshToken: tokenSet?.refreshToken,
      });
      return tokenSetResponse.data;
    },
    handleFetch: tokenSetResponse => {
      if (setTokenSet) {
        setTokenSet({ ...tokenSetResponse, creationDate: new Date() });
      }
    },
    handleResponse: (operation, accessTokenField) => (tokenSetResponse: TokenSet) => {
      if (tokenSetResponse.accessToken) {
        operation.setContext(({ headers }: { headers: any }) => ({
          headers: {
            ...headers,
            authorization: tokenSetResponse.accessToken ? `Bearer ${tokenSetResponse.accessToken}` : "",
          },
        }));
      }
      return { [accessTokenField]: tokenSetResponse };
    },
    handleError: error => {
      console.error(error);

      // When the browser is offline and an error occurs, user shouldn't get logged out
      if (navigator.onLine && !(error instanceof TypeError && error.message === "Network request failed")) {
        console.log("Online -> log out 👋");
        setHasRefreshError(true);
      }
    },
  });

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
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([ErrorLink, AuthenticationLink, TokenLink, HttpLink]),
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

const ApolloWrapper__deprecated: React.FC<PropsWithChildren> = ({ children }) => {
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

export default isFeatureEnabled(FeatureFlags.REMOVE_TIMER_BASED_TOKEN_RELOAD)
  ? ApolloWrapper
  : ApolloWrapper__deprecated;

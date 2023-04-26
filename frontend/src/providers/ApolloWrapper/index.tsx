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
import { uniqBy } from "lodash";

import config from "src/config";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { TokenSet } from "src/types";
import axios from "axios";
import { RetryLink } from "@apollo/client/link/retry";
import { PaymentRequests } from "src/__generated/graphql";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";

type ErrorDisplay = "screen" | "toaster" | "none";

const DEFAULT_ERROR_DISPLAY: ErrorDisplay = "screen";

enum GraphQLErrorMessage {
  ConnectionError = "connection error",
}

disableFragmentWarnings();

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const { impersonationSet, customClaims } = useImpersonationClaims();
  const { tokenSet, setTokenSet, setHasRefreshError } = useTokenSet();
  const [, setState] = useState();

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
        operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
          headers: {
            ...headers,
            authorization: tokenSetResponse.accessToken ? `Bearer ${tokenSetResponse.accessToken}` : "",
          },
        }));
        return { [accessTokenField]: tokenSetResponse };
      } else {
        throw new Error("No access token in token refresh response");
      }
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
    const impersonationHeaders = impersonationSet
      ? {
          "X-Hasura-Admin-Secret": impersonationSet.password,
          "X-Hasura-User-Id": impersonationSet.userId,
          "X-Hasura-projectsLeaded": `{${customClaims.projectsLeaded?.map(id => `"${id}"`).join(",")}}`,
          "X-Hasura-githubUserId": customClaims.githubUserId,
        }
      : {};
    return {
      headers: {
        ...headers,
        ...authorizationHeaders,
        ...impersonationHeaders,
      },
    };
  });

  const HttpLink = createHttpLink({
    uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  });

  const ErrorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
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

  const retryLink = new RetryLink();

  const client = new ApolloClient({
    link: ApolloLink.from([
      ErrorLink,
      retryLink,
      ...(impersonationSet ? [AuthenticationLink] : [AuthenticationLink, TokenLink]),
      HttpLink,
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        ProjectDetails: {
          keyFields: ["projectId"],
        },
        Budgets: {
          fields: {
            paymentRequests: {
              merge(existing: PaymentRequests[] = [], incoming: PaymentRequests[]) {
                return uniqBy([...existing, ...incoming], "__ref");
              },
            },
            pullRequests: {
              merge(existing: PaymentRequests[] = [], incoming: PaymentRequests[]) {
                return uniqBy([...existing, ...incoming], "__ref");
              },
            },
          },
        },
      },
    }),
  });

  const suspenseCache = new SuspenseCache();

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloWrapper;

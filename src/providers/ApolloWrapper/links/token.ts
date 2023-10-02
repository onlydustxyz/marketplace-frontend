import config from "src/config";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { TokenSet } from "src/types";
import axios from "axios";

export default function useTokenRefreshLink() {
  const { tokenSet, setTokenSet, setHasRefreshError } = useTokenSet();

  return new TokenRefreshLink<TokenSet>({
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
}

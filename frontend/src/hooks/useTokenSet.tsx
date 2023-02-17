import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import config from "src/config";
import { RefreshToken, TokenSet } from "src/types";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";

export const LOCAL_STORAGE_TOKEN_SET_KEY = "hasura_token";
const ACCESS_TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type TokenSetContextType = {
  tokenSet?: TokenSet | null;
  setTokenSet?: (tokenSet: TokenSet | null) => void;
  clearTokenSet: () => void;
  setFromRefreshToken: (refreshToken: RefreshToken) => Promise<void>;
  hasRefreshError: boolean;
  setHasRefreshError: (hasRefreshError: boolean) => void;
};

export const accessTokenValidityDelay = (token: TokenSet): number => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(
    creationDate.getSeconds() + token.accessTokenExpiresIn - ACCESS_TOKEN_VALIDITY_TIME_THRESHOLD
  );
  return expirationDate - Date.now();
};

export const accessTokenExpired = (token: TokenSet): boolean => {
  return token?.accessToken && accessTokenValidityDelay(token) <= 0;
};

const fetchNewAccessToken = async (refreshToken: RefreshToken): Promise<TokenSet> => {
  const tokenSetResponse = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
    refreshToken,
  });
  if (!tokenSetResponse.data) {
    throw new Error("Could not consume refresh token");
  }
  return { ...tokenSetResponse.data, creationDate: Date.now() };
};

const TokenSetContext = createContext<TokenSetContextType | null>(null);

export const TokenSetProvider = ({ children }: PropsWithChildren) => {
  const [tokenSet, setTokenSet] = useLocalStorage<TokenSet | null>(LOCAL_STORAGE_TOKEN_SET_KEY);
  const [hasRefreshError, setHasRefreshError] = useState(false);
  const timerRef__deprecated = useRef<NodeJS.Timeout>();

  const refreshAccessToken = (tokenSet: TokenSet) => {
    fetchNewAccessToken(tokenSet.refreshToken)
      .then(newTokenSet => {
        setTokenSet(newTokenSet);
      })
      .catch(() => setHasRefreshError(true));
  };

  useEffect(() => {
    if (tokenSet) {
      refreshAccessToken(tokenSet);
    }
  }, []);

  useEffect(() => {
    if (!isFeatureEnabled(FeatureFlags.REMOVE_TIMER_BASED_TOKEN_RELOAD)) {
      if (tokenSet) {
        if (accessTokenExpired(tokenSet)) {
          refreshAccessToken(tokenSet);
        } else {
          timerRef__deprecated.current = setTimeout(() => {
            refreshAccessToken(tokenSet);
          }, accessTokenValidityDelay(tokenSet));
        }
      }
      return () => {
        if (timerRef__deprecated.current) {
          clearTimeout(timerRef__deprecated.current);
        }
      };
    }
  }, [tokenSet?.accessToken]);

  const setFromRefreshToken = async (refreshToken: RefreshToken) => {
    const newTokenSet = await fetchNewAccessToken(refreshToken);
    setTokenSet(newTokenSet);
  };

  const clearTokenSet = () => {
    setTokenSet(null);
  };

  const value = {
    tokenSet,
    setTokenSet,
    clearTokenSet,
    setFromRefreshToken,
    hasRefreshError,
    setHasRefreshError,
  };

  return <TokenSetContext.Provider value={value}>{children}</TokenSetContext.Provider>;
};

export const useTokenSet = (): TokenSetContextType => {
  const context = useContext(TokenSetContext);
  if (!context) {
    throw new Error("useTokenSet must be used within an TokenSetProvider");
  }
  return context;
};

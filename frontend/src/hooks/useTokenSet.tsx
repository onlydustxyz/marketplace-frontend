import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import config from "src/config";
import { RefreshToken, TokenSet } from "src/types";

export const LOCAL_STORAGE_TOKEN_SET_KEY = "hasura_token";
const TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type TokenSetContextType = {
  tokenSet?: TokenSet | null;
  clearTokenSet: () => void;
  setFromRefreshToken: (refreshToken: RefreshToken) => Promise<void>;
};

export const accessTokenValidityDelay = (token: TokenSet): number => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(
    creationDate.getSeconds() + token.accessTokenExpiresIn - TOKEN_VALIDITY_TIME_THRESHOLD
  );
  return expirationDate - Date.now();
};

const accessTokenExpired = (token: TokenSet): boolean => {
  return accessTokenValidityDelay(token) < 0;
};

const fetchNewAccessToken = async (refreshToken: RefreshToken): Promise<TokenSet> => {
  const tokenSetResponse = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
    refreshToken,
  });
  if (!tokenSetResponse.data) throw new Error("Could not consume refresh token");
  return { ...tokenSetResponse.data, creationDate: Date.now() };
};

const TokenSetContext = createContext<TokenSetContextType | null>(null);

export const TokenSetProvider = ({ children }: PropsWithChildren) => {
  const [tokenSet, setTokenSet] = useLocalStorage<TokenSet | null>(LOCAL_STORAGE_TOKEN_SET_KEY);

  const refreshAccessToken = (tokenSet: TokenSet) => {
    fetchNewAccessToken(tokenSet.refreshToken).then(newTokenSet => {
      setTokenSet(newTokenSet);
    });
  };

  useEffect(() => {
    if (tokenSet) {
      if (accessTokenExpired(tokenSet)) {
        refreshAccessToken(tokenSet);
      } else {
        setTimeout(() => {
          refreshAccessToken(tokenSet);
        }, accessTokenValidityDelay(tokenSet));
      }
    }
  }, []);

  const setFromRefreshToken = async (refreshToken: RefreshToken) => {
    const newTokenSet = await fetchNewAccessToken(refreshToken);
    setTokenSet(newTokenSet);
  };

  const clearTokenSet = () => {
    setTokenSet(null);
  };

  const value = {
    tokenSet,
    clearTokenSet,
    setFromRefreshToken,
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

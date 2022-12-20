import axios from "axios";
import { createContext, PropsWithChildren, useContext } from "react";
import { useLocalStorage } from "react-use";
import config from "src/config";
import { RefreshToken, TokenSet } from "src/types";

export const LOCAL_STORAGE_TOKEN_SET_KEY = "hasura_token";
const TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type TokenSetContextType = {
  tokenSet?: TokenSet | null;
  setTokenSet: (tokenSet: TokenSet) => void;
  clearTokenSet: () => void;
  setFromRefreshToken: (refreshToken: RefreshToken) => Promise<void>;
};

const checkTokenValidity = (token: TokenSet): boolean => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(
    creationDate.getSeconds() + token.accessTokenExpiresIn - TOKEN_VALIDITY_TIME_THRESHOLD
  );
  return expirationDate > Date.now();
};

const TokenSetContext = createContext<TokenSetContextType | null>(null);

export const TokenSetProvider = ({ children }: PropsWithChildren) => {
  const [tokenSet, setTokenSet] = useLocalStorage<TokenSet | null>(LOCAL_STORAGE_TOKEN_SET_KEY);

  const setFromRefreshToken = async (refreshToken: RefreshToken) => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });
    if (!accessToken.data) throw new Error("Could not consume refresh token");
    const newTokenSet = { ...accessToken.data, creationDate: Date.now() };
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

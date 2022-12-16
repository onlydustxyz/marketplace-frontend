import axios from "axios";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { RoutePaths } from "src/App";
import config from "src/config";
import { HasuraToken, User } from "src/types";

export const LOCAL_STORAGE_HASURA_TOKEN_KEY = "hasura_token";
const TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type AuthContextType = {
  hasuraToken?: HasuraToken | null;
  getUpToDateHasuraToken: () => Promise<HasuraToken | null | undefined>;
  login: (refreshToken: string) => void;
  clearAuth: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

const checkTokenValidity = (token: HasuraToken): boolean => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(
    creationDate.getSeconds() + token.accessTokenExpiresIn - TOKEN_VALIDITY_TIME_THRESHOLD
  );
  return expirationDate > Date.now();
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [hasuraToken, setHasuraToken] = useLocalStorage<HasuraToken | null>(LOCAL_STORAGE_HASURA_TOKEN_KEY, null);
  const navigate = useNavigate();

  const consumeRefreshToken = useCallback(async (refreshToken: string) => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });
    if (!accessToken.data) throw new Error("Could not consume refresh token");
    const newHasuraToken = { ...accessToken.data, creationDate: Date.now() };
    setHasuraToken(newHasuraToken);
    return newHasuraToken;
  }, []);

  const getUpToDateHasuraToken = useCallback(async () => {
    if (hasuraToken && !checkTokenValidity(hasuraToken)) {
      return consumeRefreshToken(hasuraToken.refreshToken);
    }
    return hasuraToken;
  }, [hasuraToken]);

  const login = async (refreshToken: string) => {
    await consumeRefreshToken(refreshToken);
    navigate(RoutePaths.Profile);
  };

  const clearAuth = async () => {
    await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
      refreshToken: hasuraToken?.refreshToken,
    });
    setHasuraToken(null);
  };

  const value = useMemo(
    () => ({
      hasuraToken,
      getUpToDateHasuraToken,
      user: hasuraToken ? hasuraToken.user : null,
      login,
      clearAuth,
    }),
    [hasuraToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

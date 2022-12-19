import axios from "axios";
import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { RoutePaths } from "src/App";
import config from "src/config";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { RefreshToken, TokenSet, User, UserRole } from "src/types";

export const LOCAL_STORAGE_TOKEN_SET_KEY = "hasura_token";
const TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type AuthContextType = {
  login: (refreshToken: RefreshToken) => void;
  clearAuth: () => Promise<void>;
  user: User | null;
  isLoggedIn: boolean;
  roles: UserRole[];
  ledProjectIds: string[];
};

const AuthContext = createContext<AuthContextType | null>(null);

const checkTokenValidity = (token: TokenSet): boolean => {
  const creationDate = new Date(token.creationDate);
  const expirationDate = creationDate.setSeconds(
    creationDate.getSeconds() + token.accessTokenExpiresIn - TOKEN_VALIDITY_TIME_THRESHOLD
  );
  return expirationDate > Date.now();
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [tokenSet, setTokenSet] = useLocalStorage<TokenSet | null>(LOCAL_STORAGE_TOKEN_SET_KEY, null);
  const navigate = useNavigate();

  const consumeRefreshToken = useCallback(async (refreshToken: RefreshToken) => {
    const accessToken = await axios.post(`${config.HASURA_AUTH_BASE_URL}/token`, {
      refreshToken,
    });
    if (!accessToken.data) throw new Error("Could not consume refresh token");
    const newHasuraToken = { ...accessToken.data, creationDate: Date.now() };
    setTokenSet(newHasuraToken);
    return newHasuraToken;
  }, []);

  const getUpToDateHasuraToken = useCallback(async () => {
    if (tokenSet && !checkTokenValidity(tokenSet)) {
      return consumeRefreshToken(tokenSet.refreshToken);
    }
    return tokenSet;
  }, [tokenSet]);

  const login = async (refreshToken: RefreshToken) => {
    await consumeRefreshToken(refreshToken);
    navigate(RoutePaths.Profile);
  };

  const clearAuth = async () => {
    await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
      refreshToken: tokenSet?.refreshToken,
    });
    setTokenSet(null);
  };

  const { isLoggedIn, roles, ledProjectIds } = useRoles(tokenSet?.accessToken);

  const value = {
    user: tokenSet ? tokenSet.user : null,
    login,
    clearAuth,
    isLoggedIn,
    roles,
    ledProjectIds,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

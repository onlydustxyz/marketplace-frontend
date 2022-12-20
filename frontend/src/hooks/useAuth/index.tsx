import { useApolloClient } from "@apollo/client";
import axios from "axios";
import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import config from "src/config";
import { useGithubProfile } from "src/hooks/useAuth/useGithubProfile";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { useTokenSet } from "src/hooks/useTokenSet";
import { RefreshToken, TokenSet, User, UserRole } from "src/types";

const TOKEN_VALIDITY_TIME_THRESHOLD = 30;

type AuthContextType = {
  login: (refreshToken: RefreshToken) => void;
  logout: () => Promise<void>;
  user: User | null;
  isLoggedIn: boolean;
  roles: UserRole[];
  ledProjectIds: string[];
  githubUserId?: number;
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
  const { tokenSet, setTokenSet, clearTokenSet } = useTokenSet();
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
    await client.clearStore();
    navigate(RoutePaths.Profile);
  };

  const client = useApolloClient();

  const logout = async () => {
    await client.clearStore();
    await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
      refreshToken: tokenSet?.refreshToken,
    });
    clearTokenSet();
    navigate(RoutePaths.Projects, { replace: true });
  };

  const { isLoggedIn, roles, ledProjectIds } = useRoles(tokenSet?.accessToken);
  const { githubUserId } = useGithubProfile(roles);

  const value = {
    user: tokenSet ? tokenSet.user : null,
    login,
    logout,
    isLoggedIn,
    roles,
    ledProjectIds,
    githubUserId,
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

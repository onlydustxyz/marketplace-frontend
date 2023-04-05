import { useApolloClient } from "@apollo/client";
import axios from "axios";
import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import config from "src/config";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { RefreshToken, User, UserRole } from "src/types";
import { datadogRum } from "@datadog/browser-rum";

export type AuthContextType = {
  login: (refreshToken: RefreshToken) => void;
  logout: () => Promise<void>;
  user: User | null;
  isLoggedIn: boolean;
  roles: UserRole[];
  ledProjectIds: string[];
  githubUserId?: number;
  githubEmail?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { tokenSet, impersonationSet, setFromRefreshToken, clearTokenSet, clearImpersonationSet, hasRefreshError } =
    useTokenSet();
  const tokenIsRefreshed = !(tokenSet?.accessToken && accessTokenExpired(tokenSet));
  const { isLoggedIn, roles, ledProjectIds, githubUserId } = useRoles(tokenSet?.accessToken);

  const login = async (refreshToken: RefreshToken) => {
    await setFromRefreshToken(refreshToken);
    await client.clearStore();
  };

  const client = useApolloClient();

  const logout = async () => {
    await client.clearStore();
    if (!impersonationSet) {
      await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
        refreshToken: tokenSet?.refreshToken,
      });
      clearTokenSet();
    }
    clearImpersonationSet();
    navigate(RoutePaths.Projects, { replace: true });
  };

  if (hasRefreshError) {
    logout();
  }

  if (!tokenIsRefreshed) {
    setFromRefreshToken(tokenSet.refreshToken);
  }

  const value = {
    user: tokenSet ? tokenSet.user : null,
    login,
    logout,
    isLoggedIn,
    roles,
    ledProjectIds,
    githubUserId,
    githubEmail: tokenSet?.user?.email,
  };

  if (value.user) {
    datadogRum.setUser({
      id: value.user.id,
      name: value.user.displayName,
    });
  } else {
    datadogRum.clearUser();
  }

  return <>{tokenIsRefreshed && <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}</>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

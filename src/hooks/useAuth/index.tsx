import axios from "axios";
import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import config from "src/config";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { RefreshToken, User, UserRole } from "src/types";
import { datadogRum } from "@datadog/browser-rum";
import { useImpersonation } from "src/hooks/useAuth/useImpersonation";
import { useUser } from "./useUser";

export type AuthContextType = {
  login: (refreshToken: RefreshToken) => void;
  logout: () => Promise<void>;
  user: User | null;
  isLoggedIn: boolean;
  roles: UserRole[];
  ledProjectIds: string[];
  githubUserId?: number;
  impersonating: boolean;
  invalidImpersonation: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { tokenSet, setFromRefreshToken, clearTokenSet, hasRefreshError } = useTokenSet();
  const {
    impersonating,
    impersonatedRoles,
    impersonatedUser,
    impersonatedGithubUserId,
    impersonatedLedProjectIds,
    stopImpersonation,
    invalidImpersonation,
  } = useImpersonation();

  const tokenIsRefreshed = !(tokenSet?.accessToken && accessTokenExpired(tokenSet));
  const { isLoggedIn, roles, ledProjectIds, githubUserId } = useRoles(tokenSet?.accessToken);

  const login = async (refreshToken: RefreshToken) => {
    await setFromRefreshToken(refreshToken);
  };

  const logout = async () => {
    if (!impersonating) {
      await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
        refreshToken: tokenSet?.refreshToken,
      });
      clearTokenSet();
    } else {
      stopImpersonation();
    }
    navigate(RoutePaths.Projects, { replace: true });
  };

  if (hasRefreshError) {
    logout();
  }

  if (!tokenIsRefreshed) {
    setFromRefreshToken(tokenSet.refreshToken);
  }

  const user = useUser(impersonating ? impersonatedUser : tokenSet ? tokenSet?.user : null);

  const value = {
    user,
    login,
    logout,
    isLoggedIn: impersonating || isLoggedIn,
    roles: impersonating ? impersonatedRoles : roles,
    ledProjectIds: impersonating ? impersonatedLedProjectIds : ledProjectIds,
    githubUserId: impersonating ? impersonatedGithubUserId : githubUserId,
    invalidImpersonation,
    impersonating,
  };

  if (value.user) {
    datadogRum.setUser({
      id: value.user.id,
      name: value.user.login,
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

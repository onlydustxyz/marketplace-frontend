import { useApolloClient } from "@apollo/client";
import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import config from "src/config";
import { PENDING_PROJECT_LEADER_INVITATIONS_QUERY } from "src/graphql/queries";
import { useGithubProfile } from "src/hooks/useAuth/useGithubProfile";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { HasuraUserRole, RefreshToken, User, UserRole } from "src/types";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";
import { useHasuraLazyQuery } from "../useHasuraQuery";

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

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { tokenSet, setFromRefreshToken, clearTokenSet, hasRefreshError } = useTokenSet();

  const [launchPendingProjectLeaderInvitationsLazyQuery, pendingProjectLeaderInvitationsLazyQueryResult] =
    useHasuraLazyQuery<PendingProjectLeaderInvitationsQuery>(
      PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
      HasuraUserRole.RegisteredUser
    );

  const [startPendingProjectInvitationsQuery, setStartPendingProjectInvitationsQuery] = useState(false);

  const login = async (refreshToken: RefreshToken) => {
    await setFromRefreshToken(refreshToken);
    await client.clearStore();
    setStartPendingProjectInvitationsQuery(true);
    navigate(RoutePaths.Projects);
  };

  useEffect(() => {
    if (startPendingProjectInvitationsQuery) launchPendingProjectLeaderInvitationsLazyQuery();
  }, [startPendingProjectInvitationsQuery]);

  useEffect(() => {
    if (pendingProjectLeaderInvitationsLazyQueryResult?.data?.pendingProjectLeaderInvitations?.[0].projectId) {
      navigate(
        generatePath(RoutePaths.ProjectDetails, {
          projectId: pendingProjectLeaderInvitationsLazyQueryResult.data.pendingProjectLeaderInvitations[0].projectId,
        })
      );
    }
  }, [pendingProjectLeaderInvitationsLazyQueryResult?.data?.pendingProjectLeaderInvitations?.[0]?.projectId]);

  const client = useApolloClient();

  const logout = async () => {
    await client.clearStore();
    await axios.post(`${config.HASURA_AUTH_BASE_URL}/signout`, {
      refreshToken: tokenSet?.refreshToken,
    });
    clearTokenSet();
    navigate(RoutePaths.Projects, { replace: true });
  };

  if (hasRefreshError) {
    logout();
  }

  const { isLoggedIn, roles, ledProjectIds } = useRoles(tokenSet?.accessToken);
  const tokenIsRefreshed = !(tokenSet?.accessToken && accessTokenExpired(tokenSet));

  const { githubUserId } = useGithubProfile(roles, tokenSet?.user?.id, tokenIsRefreshed);

  const value = {
    user: tokenSet ? tokenSet.user : null,
    login,
    logout,
    isLoggedIn,
    roles,
    ledProjectIds,
    githubUserId,
  };

  return <>{tokenIsRefreshed && <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}</>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

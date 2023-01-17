import { gql, useApolloClient } from "@apollo/client";
import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import config from "src/config";
import { useGithubProfile } from "src/hooks/useAuth/useGithubProfile";
import { useRoles } from "src/hooks/useAuth/useRoles";
import { accessTokenExpired, useTokenSet } from "src/hooks/useTokenSet";
import { HasuraUserRole, RefreshToken, User, UserRole } from "src/types";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";
import { useHasuraQuery } from "../useHasuraQuery";

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

  const [skipProjectLeaderInvitationsQuery, setSkipProjectLeaderInvitationsQuery] = useState(true);

  const pendingProjectLeaderInvitationsQueryResult = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    { skip: skipProjectLeaderInvitationsQuery }
  );

  useEffect(() => {
    if (pendingProjectLeaderInvitationsQueryResult.data) {
      setSkipProjectLeaderInvitationsQuery(true);
    }
  }, [pendingProjectLeaderInvitationsQueryResult.data]);

  const login = async (refreshToken: RefreshToken) => {
    await setFromRefreshToken(refreshToken);
    await client.clearStore();
    setSkipProjectLeaderInvitationsQuery(false);
    navigate(RoutePaths.Projects);
  };

  useEffect(() => {
    if (pendingProjectLeaderInvitationsQueryResult?.data?.pendingProjectLeaderInvitations?.[0]?.projectId) {
      navigate(
        generatePath(RoutePaths.MyProjectDetails, {
          projectId: pendingProjectLeaderInvitationsQueryResult.data.pendingProjectLeaderInvitations[0].projectId,
        })
      );
    }
  }, [pendingProjectLeaderInvitationsQueryResult?.data?.pendingProjectLeaderInvitations?.[0]?.projectId]);

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

  const tokenIsRefreshed = !(tokenSet?.accessToken && accessTokenExpired(tokenSet));
  const { isLoggedIn, roles, ledProjectIds } = useRoles(tokenSet?.accessToken);

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

export const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations {
    pendingProjectLeaderInvitations {
      id
      projectId
    }
  }
`;

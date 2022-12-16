import { gql, useApolloClient } from "@apollo/client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetGithubUserIdQuery } from "src/__generated/graphql";

type UserContextType = {
  githubId?: number;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { user, clearAuth } = useAuth();
  const { data: githubIdData } = useHasuraQuery<GetGithubUserIdQuery>(
    GET_USER_GITHUB_ID,
    HasuraUserRole.RegisteredUser,
    {
      skip: !user,
    }
  );
  const client = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    await client.clearStore();
    await clearAuth();
    navigate(RoutePaths.Projects, { replace: true });
  };

  const value = useMemo(() => {
    return {
      githubId: githubIdData?.authGithubUsers?.[0]?.githubUserId,
      logout,
    };
  }, [githubIdData, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export const GET_USER_GITHUB_ID = gql`
  query GetGithubUserId {
    authGithubUsers {
      githubUserId
    }
  }
`;

import { gql, LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { useLazyHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";

export const useFetchUserGithubId = () => {
  const [githubId, setGithubId] = useState<number>();
  const [fetchGithubId, { data }] = useLazyHasuraQuery(GET_USER_GITHUB_ID, HasuraUserRole.RegisteredUser);

  useEffect(() => {
    if (data?.authGithubUsers?.[0]?.githubUserId) {
      setGithubId(data.authGithubUsers[0].githubUserId);
    }
  }, [data]);

  return {
    githubId,
    fetchGithubId,
  };
};

type UserContextType = {
  githubId?: number;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { githubId, fetchGithubId } = useFetchUserGithubId();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchGithubId();
    }
  }, [user]);

  const value = useMemo(() => {
    return {
      githubId,
    };
  }, [githubId]);

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
  query {
    authGithubUsers {
      githubUserId
    }
  }
`;

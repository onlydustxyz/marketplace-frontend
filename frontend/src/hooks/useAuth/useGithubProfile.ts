import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole, UserRole } from "src/types";
import { GetGithubUserIdQuery } from "src/__generated/graphql";

export const useGithubProfile = (roles: UserRole[]) => {
  const { data, loading } = useHasuraQuery<GetGithubUserIdQuery>(GET_USER_GITHUB_ID, HasuraUserRole.RegisteredUser, {
    skip: !roles.includes(HasuraUserRole.RegisteredUser),
  });
  const githubUserId = data?.authGithubUsers?.[0]?.githubUserId;
  return { githubUserId, loading };
};

export const GET_USER_GITHUB_ID = gql`
  query GetGithubUserId {
    authGithubUsers {
      githubUserId
    }
  }
`;

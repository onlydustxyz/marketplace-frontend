import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole, UserRole } from "src/types";
import { GetGithubUserIdQuery } from "src/__generated/graphql";

export const useGithubProfile = (roles: UserRole[], userId?: string, isTokenRefreshed?: boolean) => {
  const { data, loading } = useHasuraQuery<GetGithubUserIdQuery>(GET_USER_GITHUB_ID, HasuraUserRole.RegisteredUser, {
    skip: !roles.includes(HasuraUserRole.RegisteredUser) || !userId || !isTokenRefreshed,
    variables: {
      userId,
    },
  });
  const githubUserId = data?.authGithubUsers?.[0]?.githubUserId;
  return { githubUserId, loading };
};

export const GET_USER_GITHUB_ID = gql`
  query GetGithubUserId($userId: uuid) {
    authGithubUsers(where: { userId: { _eq: $userId } }) {
      githubUserId
    }
  }
`;

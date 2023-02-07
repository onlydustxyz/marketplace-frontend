import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { GetGithubUserQuery } from "src/__generated/graphql";
import { useHasuraSuspensedQuery } from "./useHasuraQuery";

export default function useGithubUser(githubUserId: number) {
  const getGithubUserQuery = useHasuraSuspensedQuery<GetGithubUserQuery>(GET_GITHUB_USER_QUERY, HasuraUserRole.Public, {
    variables: { githubUserId },
  });

  return {
    ...getGithubUserQuery,
    data: getGithubUserQuery.data?.fetchUserDetailsById,
  };
}

export const GITHUB_USER_FRAGMENT = gql`
  fragment GithubUser on User {
    id
    login
    avatarUrl
  }
`;

export const GET_GITHUB_USER_QUERY = gql`
  ${GITHUB_USER_FRAGMENT}
  query GetGithubUser($githubUserId: Int!) {
    fetchUserDetailsById(userId: $githubUserId) {
      ...GithubUser
    }
  }
`;

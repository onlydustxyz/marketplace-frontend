import { gql, useSuspenseQuery_experimental } from "@apollo/client";
import { GetGithubUserDocument } from "src/__generated/graphql";

export default function useGithubUser(githubUserId: number) {
  const getGithubUserQuery = useSuspenseQuery_experimental(GetGithubUserDocument, {
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

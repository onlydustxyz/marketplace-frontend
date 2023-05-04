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

gql`
  query GetGithubUser($githubUserId: Int!) {
    fetchUserDetailsById(userId: $githubUserId) {
      ...GithubUser
    }
  }
`;

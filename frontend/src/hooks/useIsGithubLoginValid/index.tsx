import { gql } from "@apollo/client";
import { useFindUserQueryForPaymentFormLazyQuery } from "src/__generated/graphql";
import { GITHUB_USER_FRAGMENT } from "src/hooks/useGithubUser";

export default function useFindGithubUser() {
  const [trigger, query] = useFindUserQueryForPaymentFormLazyQuery({
    context: {
      graphqlErrorDisplay: "none", // tell ApolloWrapper to ignore the errors
    },
  });

  return {
    trigger: (username: string) => trigger({ variables: { username } }),
    loading: query.loading,
    user: query.data?.fetchUserDetails,
    error: query.error,
  };
}

export const GITHUB_CONTRIBUTOR_FRAGMENT = gql`
  ${GITHUB_USER_FRAGMENT}
  fragment GithubContributor on User {
    ...GithubUser
    user {
      userId
    }
  }
`;

export const FIND_USER_QUERY = gql`
  ${GITHUB_CONTRIBUTOR_FRAGMENT}
  query FindUserQueryForPaymentForm($username: String!) {
    fetchUserDetails(username: $username) {
      ...GithubContributor
    }
  }
`;

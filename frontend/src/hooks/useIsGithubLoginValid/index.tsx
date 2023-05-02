import { gql } from "@apollo/client";
import { GithubUserFragmentDoc, useFindUserQueryForPaymentFormLazyQuery } from "src/__generated/graphql";

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

gql`
  ${GithubUserFragmentDoc}

  fragment GithubContributor on User {
    ...GithubUser
    user {
      userId
    }
  }

  query FindUserQueryForPaymentForm($username: String!) {
    fetchUserDetails(username: $username) {
      ...GithubContributor
    }
  }
`;

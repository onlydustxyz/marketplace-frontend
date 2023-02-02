import { gql } from "@apollo/client";
import { useHasuraLazyQuery } from "src/hooks/useHasuraQuery";
import { GITHUB_USER_FRAGMENT } from "src/pages/ProjectDetails/PaymentActions/useGetPaymentRequests";
import { HasuraUserRole } from "src/types";
import { FindUserQueryForPaymentFormQuery } from "src/__generated/graphql";

export default function useFindGithubUser() {
  const [trigger, query] = useHasuraLazyQuery<FindUserQueryForPaymentFormQuery>(
    FIND_USER_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      context: {
        graphqlErrorDisplay: "none", // tell ApolloWrapper to ignore the errors
      },
    }
  );

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

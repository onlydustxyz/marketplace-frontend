import { gql } from "@apollo/client";
import { useHasuraLazyQuery } from "src/hooks/useHasuraQuery";
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
    userId: query.data?.fetchUserDetails.id,
    error: query.error,
  };
}

export const FIND_USER_QUERY = gql`
  query FindUserQueryForPaymentForm($username: String!) {
    fetchUserDetails(username: $username) {
      id
    }
  }
`;

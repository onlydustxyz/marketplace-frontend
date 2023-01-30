import { gql, OperationVariables, QueryResult } from "@apollo/client";
import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  PendingProjectLeaderInvitationsQuery,
  PendingUserPaymentsAndPayoutSettingsQuery,
} from "src/__generated/graphql";

export type User = {
  githubUserId?: number;
  userId?: string;
};

export default function useSignupRedirection({ githubUserId, userId }: User) {
  const pendingProjectLeaderInvitationsQuery = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { githubUserId },
      skip: !githubUserId,
    }
  );

  const pendingUserPaymentsAndPayoutSettingsQuery = useHasuraQuery<PendingUserPaymentsAndPayoutSettingsQuery>(
    PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS,
    HasuraUserRole.RegisteredUser,
    {
      variables: { userId: userId },
      skip: !userId,
    }
  );

  return {
    loading: pendingProjectLeaderInvitationsQuery.loading || pendingUserPaymentsAndPayoutSettingsQuery.loading,
    url: getRedirectionUrl(pendingProjectLeaderInvitationsQuery, pendingUserPaymentsAndPayoutSettingsQuery),
  };
}

const getRedirectionUrl = (
  pendingProjectLeaderInvitationsQuery: QueryResult<PendingProjectLeaderInvitationsQuery, OperationVariables>,
  pendingUserPaymentsAndPayoutSettingsQuery: QueryResult<PendingUserPaymentsAndPayoutSettingsQuery, OperationVariables>
) => {
  const missingPayoutInfo = !pendingUserPaymentsAndPayoutSettingsQuery.data?.user?.userInfo?.payoutSettings;
  const pendingPaymentRequests =
    pendingUserPaymentsAndPayoutSettingsQuery.data?.user?.githubUser?.paymentRequests.filter(
      r => r.amountInUsd > r.paymentsAggregate.aggregate?.sum?.amount
    );

  if (missingPayoutInfo && pendingPaymentRequests && pendingPaymentRequests.length > 0) {
    return RoutePaths.Profile;
  }

  const projectId = pendingProjectLeaderInvitationsQuery?.data?.pendingProjectLeaderInvitations?.[0]?.projectId;
  if (projectId) {
    return generatePath(RoutePaths.ProjectDetails, { projectId });
  }

  return RoutePaths.Projects;
};

export const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations($githubUserId: bigint) {
    pendingProjectLeaderInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
      id
      projectId
    }
  }
`;

export const PENDING_USER_PAYMENTS_AND_PAYOUT_SETTINGS = gql`
  query PendingUserPaymentsAndPayoutSettings($userId: uuid!) {
    user(id: $userId) {
      userInfo {
        userId
        payoutSettings
      }
      githubUser {
        paymentRequests {
          amountInUsd
          paymentsAggregate {
            aggregate {
              sum {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";
import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import {
  PendingProjectLeaderInvitationsQueryHookResult,
  PendingUserPaymentsQueryHookResult,
  usePendingProjectLeaderInvitationsQuery,
  usePendingUserPaymentsQuery,
} from "src/__generated/graphql";

export type User = {
  githubUserId?: number;
  userId?: string;
};

export default function useSignupRedirection({ githubUserId, userId }: User) {
  const pendingProjectLeaderInvitationsQuery = usePendingProjectLeaderInvitationsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });

  const { valid: validPayoutInfo, loading: payoutSettingsQueryLoading } = usePayoutSettings(githubUserId);

  const pendingUserPaymentsQuery = usePendingUserPaymentsQuery({
    variables: { userId: userId },
    skip: !userId,
  });

  return {
    loading:
      pendingProjectLeaderInvitationsQuery.loading || pendingUserPaymentsQuery.loading || payoutSettingsQueryLoading,
    url: getRedirectionUrl(pendingProjectLeaderInvitationsQuery, pendingUserPaymentsQuery, validPayoutInfo),
  };
}

const getRedirectionUrl = (
  pendingProjectLeaderInvitationsQuery: PendingProjectLeaderInvitationsQueryHookResult,
  pendingUserPaymentsAndPayoutSettingsQuery: PendingUserPaymentsQueryHookResult,
  validPayoutInfo: boolean | null | undefined
) => {
  const pendingPaymentRequests =
    pendingUserPaymentsAndPayoutSettingsQuery.data?.user?.githubUser?.paymentRequests.filter(
      r => r.amountInUsd > r.paymentsAggregate.aggregate?.sum?.amount
    );

  if (!validPayoutInfo && pendingPaymentRequests && pendingPaymentRequests.length > 0) {
    return RoutePaths.Payments;
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

export const PENDING_USER_PAYMENTS = gql`
  query PendingUserPayments($userId: uuid!) {
    user(id: $userId) {
      id
      githubUser {
        userId
        paymentRequests {
          id
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

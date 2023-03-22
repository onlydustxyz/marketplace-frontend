import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole, PaymentStatus } from "src/types";
import { IssueDetailsFragmentDoc, PaymentRequestDetailsQuery } from "src/__generated/graphql";
import View from "./View";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentId: string;
  status: PaymentStatus;
  payoutInfoMissing: boolean;
  invoiceNeeded?: boolean;
};

export default function PaymentRequestSidePanel({ paymentId, ...props }: Props) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = useHasuraQuery<PaymentRequestDetailsQuery>(
    GET_PAYMENT_REQUEST_DETAILS,
    HasuraUserRole.RegisteredUser,
    {
      variables: { id: paymentId },
      skip: !githubUserId || !user,
    }
  );

  return (
    <View
      {...props}
      loading={loading}
      {...data?.paymentRequestsByPk}
      id={paymentId}
      userId={user?.id}
      githubUserId={githubUserId}
    />
  );
}

const GET_PAYMENT_REQUEST_DETAILS = gql`
  ${IssueDetailsFragmentDoc}
  fragment PaymentRequestDetails on PaymentRequests {
    id
    amountInUsd
    requestedAt
    paymentsAggregate {
      aggregate {
        max {
          processedAt
        }
      }
    }
    invoiceReceivedAt
    requestor {
      id
      displayName
      avatarUrl
    }
    githubRecipient {
      id
      login
      avatarUrl
    }
    workItems {
      githubIssue {
        ...IssueDetails
      }
    }
  }

  query PaymentRequestDetails($id: uuid!) {
    paymentRequestsByPk(id: $id) {
      ...PaymentRequestDetails
    }
  }
`;

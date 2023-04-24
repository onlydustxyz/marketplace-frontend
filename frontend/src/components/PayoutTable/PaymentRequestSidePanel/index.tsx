import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { HasuraUserRole, PaymentStatus } from "src/types";
import { IssueDetailsFragmentDoc, PaymentRequestDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import usePaymentRequests from "src/hooks/usePaymentRequests";

type Props = {
  projectId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentId: string;
  projectLeaderView?: boolean;
};

export default function PaymentRequestSidePanel({ projectId, paymentId, projectLeaderView, ...props }: Props) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = useHasuraQuery<PaymentRequestDetailsQuery>(
    GET_PAYMENT_REQUEST_DETAILS,
    HasuraUserRole.RegisteredUser,
    {
      variables: { id: paymentId },
      skip: !githubUserId || !user,
    }
  );

  const status =
    data?.paymentRequestsByPk?.paymentsAggregate.aggregate?.sum?.amount === data?.paymentRequestsByPk?.amountInUsd
      ? PaymentStatus.ACCEPTED
      : PaymentStatus.WAITING_PAYMENT;

  const { invoiceNeeded, valid: payoutSettingsValid } = usePayoutSettings(
    data?.paymentRequestsByPk?.githubRecipient?.id
  );

  const { cancelPaymentRequest } = usePaymentRequests(projectId);

  return (
    <View
      {...props}
      loading={loading}
      {...data?.paymentRequestsByPk}
      id={paymentId}
      userId={user?.id}
      githubUserId={githubUserId}
      status={status}
      invoiceNeeded={invoiceNeeded}
      payoutInfoMissing={!payoutSettingsValid}
      projectLeaderView={projectLeaderView}
      onPaymentCancel={() => cancelPaymentRequest({ variables: { paymentId } })}
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
    paymentsAggregate {
      aggregate {
        sum {
          amount
        }
      }
    }
  }

  query PaymentRequestDetails($id: uuid!) {
    paymentRequestsByPk(id: $id) {
      ...PaymentRequestDetails
    }
  }
`;

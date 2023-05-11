import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus } from "src/types";
import { LiveGithubIssueFragmentDoc, usePaymentRequestDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  projectId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentId: string;
  projectLeaderView?: boolean;
};

export default function PaymentRequestSidePanel({ projectId, paymentId, projectLeaderView, setOpen, ...props }: Props) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = usePaymentRequestDetailsQuery({
    variables: { id: paymentId },
    skip: !githubUserId || !user,
  });

  const showToaster = useShowToaster();
  const { T } = useIntl();

  const status =
    data?.paymentRequestsByPk?.paymentsAggregate.aggregate?.sum?.amount === data?.paymentRequestsByPk?.amountInUsd
      ? PaymentStatus.ACCEPTED
      : PaymentStatus.WAITING_PAYMENT;

  const { invoiceNeeded, valid: payoutSettingsValid } = usePayoutSettings(
    data?.paymentRequestsByPk?.githubRecipient?.id
  );

  const { cancelPaymentRequest } = usePaymentRequests(projectId);

  const onPaymentCancel = () =>
    cancelPaymentRequest({
      variables: { projectId, paymentId },
      onCompleted: () => {
        setOpen(false);
        showToaster(T("payment.form.cancelled"));
      },
    });

  return (
    <View
      {...props}
      setOpen={setOpen}
      loading={loading}
      {...data?.paymentRequestsByPk}
      id={paymentId}
      userId={user?.id}
      githubUserId={githubUserId}
      status={status}
      invoiceNeeded={invoiceNeeded}
      payoutInfoMissing={!payoutSettingsValid}
      projectLeaderView={projectLeaderView}
      onPaymentCancel={onPaymentCancel}
    />
  );
}

gql`
  ${LiveGithubIssueFragmentDoc}
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
    liveGithubRecipient {
      ...LiveGithubUser
    }
    workItems {
      ...WorkItemId
      githubIssue {
        ...LiveGithubIssue
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

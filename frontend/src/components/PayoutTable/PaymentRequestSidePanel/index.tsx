import { useAuth } from "src/hooks/useAuth";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus } from "src/types";
import { usePaymentRequestDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentId: string;
};

export default function PaymentRequestSidePanel({
  paymentId,
  ...props
}: Props & {
  onPaymentCancel?: () => void;
  projectLeaderView?: boolean;
}) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = usePaymentRequestDetailsQuery({
    variables: { id: paymentId },
    skip: !githubUserId || !user,
  });

  const status =
    data?.paymentRequestsByPk?.paymentsAggregate.aggregate?.sum?.amount === data?.paymentRequestsByPk?.amountInUsd
      ? PaymentStatus.ACCEPTED
      : PaymentStatus.WAITING_PAYMENT;

  const { invoiceNeeded, valid: payoutSettingsValid } = usePayoutSettings(
    data?.paymentRequestsByPk?.liveGithubRecipient?.id
  );

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
    />
  );
}

export function PaymentRequestSidePanelAsLeader({
  projectId,
  paymentId,
  setOpen,
  ...props
}: Props & { projectId: string }) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

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
    <PaymentRequestSidePanel
      {...props}
      projectLeaderView
      paymentId={paymentId}
      setOpen={setOpen}
      onPaymentCancel={onPaymentCancel}
    />
  );
}

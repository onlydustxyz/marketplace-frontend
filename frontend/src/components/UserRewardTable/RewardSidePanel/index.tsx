import { useAuth } from "src/hooks/useAuth";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus } from "src/types";
import { useCancelPaymentRequestMutation, usePaymentRequestDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";
import { useCommands } from "src/providers/Commands";

type Props = {
  rewardId: string;
  onRewardCancel?: () => void;
  projectLeaderView?: boolean;
};

export default function RewardSidePanel({ rewardId, onRewardCancel, projectLeaderView }: Props) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = usePaymentRequestDetailsQuery({
    variables: { id: rewardId },
    skip: !githubUserId || !user,
  });

  const status =
    data?.paymentRequestsByPk?.paymentsAggregate.aggregate?.sum?.amount === data?.paymentRequestsByPk?.amountInUsd
      ? PaymentStatus.ACCEPTED
      : PaymentStatus.WAITING_PAYMENT;

  const { invoiceNeeded, valid: payoutSettingsValid } = usePayoutSettings(
    data?.paymentRequestsByPk?.githubRecipient?.id
  );

  return (
    <View
      loading={loading}
      {...data?.paymentRequestsByPk}
      id={rewardId}
      userId={user?.id}
      githubUserId={githubUserId}
      status={status}
      invoiceNeeded={invoiceNeeded}
      payoutInfoMissing={!payoutSettingsValid}
      onRewardCancel={onRewardCancel}
      projectLeaderView={projectLeaderView}
    />
  );
}

export function RewardSidePanelAsLeader({
  projectId,
  rewardId,
  setOpen,
}: {
  projectId: string;
  rewardId: string;
  setOpen: (value: boolean) => void;
}) {
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const { notify } = useCommands();

  const [cancelPaymentRequest] = useCancelPaymentRequestMutation({
    variables: { projectId, paymentId: rewardId },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => {
      notify(projectId);
      setOpen(false);
      showToaster(T("reward.form.cancelled"));
    },
  });

  return <RewardSidePanel projectLeaderView rewardId={rewardId} onRewardCancel={cancelPaymentRequest} />;
}

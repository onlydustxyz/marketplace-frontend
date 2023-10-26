import { ComponentProps } from "react";
import { useCancelPaymentRequestMutation } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { useCommands } from "src/providers/Commands";
import View from "./View";

export default function RewardSidePanel({
  projectId,
  rewardId,
  onRewardCancel,
  projectLeaderView,
}: ComponentProps<typeof View>) {
  return (
    <View
      projectId={projectId}
      rewardId={rewardId}
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
    variables: { paymentId: rewardId },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => {
      notify(projectId);
      setOpen(false);
      showToaster(T("reward.form.cancelled"));
    },
  });

  return (
    <RewardSidePanel
      projectId={projectId}
      rewardId={rewardId}
      onRewardCancel={cancelPaymentRequest}
      projectLeaderView
    />
  );
}

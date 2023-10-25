import { useOutletContext } from "react-router-dom";
import { useCancelPaymentRequestMutation, usePaymentRequestDetailsQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useShowToaster } from "src/hooks/useToaster";
import { useCommands } from "src/providers/Commands";
import { PaymentStatus, Project } from "src/types";
import View from "./View";

type OutletContext = {
  projectId: Project["id"];
};

type Props = {
  rewardId: string;
  onRewardCancel?: () => void;
  projectLeaderView?: boolean;
  recipientId?: string;
};

export default function RewardSidePanel({ rewardId, onRewardCancel, projectLeaderView, recipientId }: Props) {
  const { user, githubUserId } = useAuth();
  const { data, loading } = usePaymentRequestDetailsQuery({
    variables: { id: rewardId, githubUserId: recipientId },
    skip: !githubUserId || !user,
  });

  //   const { projectId } = useOutletContext<OutletContext>();
  //   const { data, isLoading, isError } = useRestfulData({
  //     resourcePath: ApiResourcePaths.GET_PROJECT_REWARD,
  //     pathParam: { projectId, rewardId },
  //     method: "GET",
  //   });

  const status =
    data?.paymentRequests[0]?.paymentsAggregate.aggregate?.sum?.amount === data?.paymentRequests[0]?.amount
      ? PaymentStatus.ACCEPTED
      : PaymentStatus.WAITING_PAYMENT;

  const { invoiceNeeded, valid: payoutSettingsValid } = usePayoutSettings(
    data?.paymentRequests[0]?.githubRecipient?.id
  );

  return (
    <View
      loading={loading}
      {...data?.paymentRequests[0]}
      id={rewardId}
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
  recipientId,
}: {
  projectId: string;
  rewardId: string;
  setOpen: (value: boolean) => void;
  recipientId: string;
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
      projectLeaderView
      rewardId={rewardId}
      onRewardCancel={cancelPaymentRequest}
      recipientId={recipientId}
    />
  );
}

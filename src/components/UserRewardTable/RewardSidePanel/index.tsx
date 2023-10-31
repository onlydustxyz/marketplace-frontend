import { ComponentProps } from "react";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import View from "./View";
import { useMutationRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";

export default function RewardSidePanel({
  projectId,
  rewardId,
  onRewardCancel,
  projectLeaderView,
  isMine,
}: ComponentProps<typeof View>) {
  return isMine ? (
    <View rewardId={rewardId} onRewardCancel={onRewardCancel} projectLeaderView={projectLeaderView} isMine={isMine} />
  ) : (
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
  onRewardCancel,
}: {
  projectId: string;
  rewardId: string;
  onRewardCancel: () => void;
}) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const { mutate: mutateReward } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.PROJECT_REWARD,
    pathParam: { projectId, rewardId },
    method: "DELETE",
    onSuccess: () => {
      onRewardCancel();
      showToaster(T("reward.form.cancelled"));
    },
  });

  return <RewardSidePanel projectId={projectId} rewardId={rewardId} onRewardCancel={mutateReward} projectLeaderView />;
}

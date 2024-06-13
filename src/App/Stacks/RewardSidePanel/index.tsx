import { ComponentProps, useEffect } from "react";

import { usePosthog } from "src/hooks/usePosthog";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useMutationRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useShowToaster } from "src/hooks/useToaster";

import { useMenu } from "hooks/menu/use-menu/use-menu";
import { useIntl } from "hooks/translate/use-translate";

import View from "./View";

export default function RewardSidePanel({
  projectId,
  rewardId,
  onRewardCancel,
  projectLeaderView,
  isMine,
}: ComponentProps<typeof View>) {
  const { redirection } = useMenu();
  const { capture } = usePosthog();

  useEffect(() => {
    if (rewardId) {
      capture("reward_viewed", { id_reward: rewardId });
    }
  }, []);

  return (
    <View
      rewardId={rewardId}
      onRewardCancel={onRewardCancel}
      projectLeaderView={projectLeaderView}
      isMine={isMine}
      projectId={projectId}
      redirectionStatus={redirection}
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
  const { capture } = usePosthog();

  const { mutate: mutateReward } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.PROJECT_REWARD,
    pathParam: { projectId, rewardId },
    method: "DELETE",
    onSuccess: () => {
      onRewardCancel();
      showToaster(T("reward.form.cancelled"));
      capture("reward_cancelled", { reward_id: rewardId });
    },
  });

  return <RewardSidePanel projectId={projectId} rewardId={rewardId} onRewardCancel={mutateReward} projectLeaderView />;
}

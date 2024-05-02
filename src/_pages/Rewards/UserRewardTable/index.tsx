import { ReactElement, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { StackRoute, useStackReward } from "src/App/Stacks/Stacks";
import { viewportConfig } from "src/config";
import { useSubscribeStacks } from "src/libs/react-stack";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

import DesktopUserRewardList from "./DesktopUserRewardList";
import { MyRewardType } from "./Line";
import MobileUserRewardList from "./MobileUserRewardList";

export function UserRewardTable({ emptyState }: { emptyState?: ReactElement }) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedReward, setSelectedReward] = useState<MyRewardType | null>(null);
  const { open } = useSubscribeStacks(StackRoute.Reward);
  const [openRewardPanel] = useStackReward();

  const { profiles } = useBillingProfiles();
  const showContributor = useMemo(
    () => Boolean(profiles?.find(profile => profile?.data?.type === "COMPANY" && profile?.data?.role === "ADMIN")),
    [profiles]
  );

  useEffect(() => {
    if (!open && selectedReward) {
      setSelectedReward(null);
    }
  }, [open]);

  const onRewardClick = (reward: MyRewardType) => {
    setSelectedReward(reward);
    if (reward.id) {
      openRewardPanel({ rewardId: reward.id, projectId: reward.projectId, isMine: true });
    }
  };

  return (
    <>
      {isXl ? (
        <DesktopUserRewardList
          onRewardClick={onRewardClick}
          selectedReward={selectedReward}
          emptyState={emptyState}
          showContributor={showContributor}
        />
      ) : (
        <MobileUserRewardList onRewardClick={onRewardClick} showContributor={showContributor} />
      )}
    </>
  );
}

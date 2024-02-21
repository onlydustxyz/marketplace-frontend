import { ReactElement, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { StackRoute, useStackReward } from "src/App/Stacks/Stacks";
import { viewportConfig } from "src/config";
import { useSubscribeStacks } from "src/libs/react-stack";

import { useBillingProfiles } from "hooks/users/useBillingProfile/useBillingProfile";
import { useBillingStatus } from "hooks/users/useBillingStatus/useBillingStatus";

import DesktopUserRewardList from "./DesktopUserRewardList";
import { MyRewardType } from "./Line";
import MobileUserRewardList from "./MobileUserRewardList";

export function UserRewardTable({ emptyState }: { emptyState?: ReactElement }) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { validBillingProfile, billingProfile } = useBillingProfiles();
  const { isError: isBillingError } = useBillingStatus({
    hasValidBillingProfile: validBillingProfile,
    status: billingProfile?.status,
  });
  const [selectedReward, setSelectedReward] = useState<MyRewardType | null>(null);
  const { open } = useSubscribeStacks(StackRoute.Reward);
  const [openRewardPanel] = useStackReward();

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
          isBillingError={isBillingError}
        />
      ) : (
        <MobileUserRewardList onRewardClick={onRewardClick} isBillingError={isBillingError} />
      )}
    </>
  );
}

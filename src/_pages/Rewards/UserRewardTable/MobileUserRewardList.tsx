import { ReactElement, ReactNode, useContext, useMemo } from "react";

import ErrorFallback from "src/ErrorFallback";
import { components } from "src/__generated/api";
import { UserRewardsContext } from "src/_pages/Rewards/context/UserRewards";
import { IMAGES } from "src/assets/img";
import Card from "src/components//Card";
import RoundedImage from "src/components//RoundedImage";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import TimeLine from "src/icons/TimeLine";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";

import { Avatar } from "components/ds/avatar/avatar";
import { PayoutStatus } from "components/features/payout-status/payout-status";
import { Icon } from "components/layout/icon/icon";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { MyRewardType } from "./Line";

export default function MobileUserRewardList({
  onRewardClick,
  emptyState,
  showContributor,
}: {
  onRewardClick: (reward: MyRewardType) => void;
  emptyState?: ReactElement;
  showContributor?: boolean;
}) {
  const { T } = useIntl();
  const { query, rewards } = useContext(UserRewardsContext);

  const { error, fetchNextPage, hasNextPage, isFetchingNextPage } = query ?? {};

  if (error) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
        <ErrorFallback />
      </div>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        {rewards.length > 0 ? (
          <>
            {rewards.map(reward => (
              <button onClick={() => onRewardClick(reward)} key={reward.id}>
                <MobileUserRewardItem
                  title={reward?.rewardedOnProjectName}
                  id={reward.id}
                  image={
                    <RoundedImage
                      src={reward?.rewardedOnProjectLogoUrl || IMAGES.logo.space}
                      alt={reward?.rewardedOnProjectName || ""}
                    />
                  }
                  request={T("reward.table.reward", {
                    id: pretty(reward.id),
                    count: reward.numberOfRewardedContributions,
                  })}
                  amount={reward.amount}
                  date={new Date(reward.requestedAt)}
                  payoutStatus={
                    <PayoutStatus
                      status={reward?.status}
                      dates={{ unlockDate: reward?.unlockDate, processedAt: reward?.processedAt }}
                      projectId={reward?.projectId}
                    />
                  }
                  rewardedUser={reward?.rewardedUser}
                  showContributor={showContributor}
                />
              </button>
            ))}
            {hasNextPage && (
              <div className="py-6">
                <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
              </div>
            )}
          </>
        ) : (
          emptyState ?? null
        )}
      </div>
    </Card>
  );
}

export function MobileUserRewardItem({
  image,
  title,
  id,
  request,
  amount,
  date,
  payoutStatus,
  rewardedUser,
  showContributor,
}: {
  image: ReactNode;
  title?: string | null;
  id: string;
  request: string;
  amount: components["schemas"]["RewardAmountResponse"];
  date: Date;
  payoutStatus: ReactNode;
  rewardedUser: components["schemas"]["ContributorResponse"];
  showContributor?: boolean;
}) {
  const { T } = useIntl();
  const { user } = useCurrentUser();

  const isCurrentUser = useMemo(() => user?.githubUserId === rewardedUser?.githubUserId, [user, rewardedUser]);

  return (
    <Card className="flex flex-col gap-3 divide-y divide-greyscale-50/8" selectable>
      <div className="flex flex-col gap-3">
        <div
          // Required to align tooltip with the payout status tag
          className="inline-flex"
        >
          {payoutStatus}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {image}
            <div className="flex flex-col items-start">
              <div className="font-belwe text-base font-normal">{title}</div>
              <div className="text-sm text-spaceBlue-200">{request}</div>
            </div>
          </div>
          <ArrowRightSLine className="text-xl text-spaceBlue-200" />
        </div>
      </div>

      <div
        className={cn("grid gap-y-3 pt-3 font-walsheim text-sm sm:grid-cols-2", {
          "md:grid-cols-3": showContributor,
        })}
      >
        <div className="flex flex-col items-start pr-4">
          <div className="flex items-center gap-1 font-semibold uppercase text-spaceBlue-200">
            <MoneyDollarCircleLine className="text-base font-medium" />
            {T("reward.table.amount")}
          </div>
          <div className="rounded-full border border-white/8 bg-white/2 px-3 py-[6px]">
            <AvailableConversion
              tooltipId={`${id}-contributors-earned-details`}
              totalAmount={amount?.total}
              currency={{
                currency: amount?.currency,
                amount: amount?.total,
                dollar: amount?.dollarsEquivalent,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-start text-left sm:border-l sm:border-l-greyscale-50/8 sm:px-4">
          <div className="flex items-center gap-1 font-semibold uppercase text-spaceBlue-200">
            <TimeLine className="text-base font-medium" />
            {T("reward.table.date")}
          </div>
          {displayRelativeDate(date)}
        </div>

        {showContributor ? (
          <div className={"flex flex-col items-start sm:border-l-greyscale-50/8 md:border-l md:pl-4"}>
            <div className="flex items-center gap-1 font-semibold uppercase text-spaceBlue-200">
              <Icon remixName={"ri-user-3-line"} className="text-base font-medium" />
              {T("reward.table.contributor")}
            </div>
            <Avatar.Labelled avatarProps={{ src: rewardedUser.avatarUrl }}>
              {rewardedUser.login} {isCurrentUser ? `(${T("reward.table.you")})` : ""}
            </Avatar.Labelled>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

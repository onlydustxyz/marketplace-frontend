import { GetMyRewardsPageResponse } from "api-client/resources/me/types";
import { formatDistanceToNowStrict } from "date-fns";

import { AvailableConversion } from "src/components/Currency/AvailableConversion";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RewardsMobile({
  rewards,
  onClick,
}: {
  rewards: GetMyRewardsPageResponse["rewards"];
  onClick: () => void;
}) {
  return (
    <Card background={"base"} hasPadding={false}>
      <div className="grid gap-4 p-4">
        {rewards.map(reward => (
          <Card key={reward.id} background={"light"} hasPadding={false} onClick={onClick} className={"group"}>
            <div className={"grid gap-2.5 divide-y divide-card-border-light px-5 py-3"}>
              <div className="flex items-center justify-between gap-5">
                <AvatarLabelled
                  avatarProps={{
                    src: reward.rewardedOnProjectLogoUrl,
                    alt: reward.rewardedOnProjectName,
                    size: "m",
                    shape: "square",
                  }}
                  labelProps={{ title: reward.rewardedOnProjectName }}
                >
                  <Typography variant="title-s" className={"truncate"}>
                    {reward.rewardedOnProjectName}
                  </Typography>
                  <Typography
                    variant="body-xs"
                    className={"text-spaceBlue-200"}
                    translate={{
                      token: "v2.pages.home.rewards.rewardsTable.rows.projectContribution",
                      params: { id: reward.amount.prettyAmount, count: reward.numberOfRewardedContributions },
                    }}
                  />
                </AvatarLabelled>
                <Icon
                  remixName="ri-arrow-right-s-line"
                  size={24}
                  className="transition-all group-hover:translate-x-1"
                />
              </div>

              <div className={"grid gap-2.5 pt-2.5"}>
                <div className={"grid gap-2"}>
                  <Typography variant="body-s-bold" className={"flex gap-1 uppercase text-spaceBlue-200"}>
                    <Icon remixName={"ri-money-dollar-circle-line"} />
                    <Translate token={"v2.pages.home.rewards.mobile.amount"} />
                  </Typography>
                  {reward.amount ? (
                    <AvailableConversion
                      tooltipId={`${reward.id}-contributors-earned-details`}
                      totalAmount={reward.amount.prettyAmount}
                      currency={{
                        currency: reward.amount.currency,
                        amount: reward.amount.prettyAmount,
                        dollar: reward.amount.usdEquivalent,
                      }}
                      showDollarConversion={false}
                    />
                  ) : (
                    "-"
                  )}
                </div>

                <div className={"grid gap-2"}>
                  <Typography variant="body-s-bold" className={"flex gap-1 uppercase text-spaceBlue-200"}>
                    <Icon remixName={"ri-time-line"} />
                    <Translate token={"v2.pages.home.rewards.mobile.sent"} />
                  </Typography>
                  <Typography variant="body-s">
                    {formatDistanceToNowStrict(new Date(reward.requestedAt), { addSuffix: true })}
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

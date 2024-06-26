import Image from "next/image";
import profileCardBackground from "public/images/profile-card-bg.svg";
import { getOrdinalSuffix } from "utils/profile/ordinal-position-suffix";

import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { RankCategory } from "components/features/profile-card/components/rank-category/rank-category";
import { TProfileCard } from "components/features/profile-card/profile-card.types";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

function ProfileStatItem({ icon, token, count }: TProfileCard.ProfileStatProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon remixName={icon} size={16} />
      <Typography variant="body-m" translate={{ token, params: { count: count ?? 0 } }} />
    </div>
  );
}

export function ProfileCard(props: TProfileCard.Props) {
  const {
    className,
    isInPopover = false,
    avatarUrl,
    login,
    rankCategory,
    contributionCount,
    rewardCount,
    contributedProjectCount,
    leadedProjectCount,
    rank,
    rankPercentile,
  } = props;

  return (
    <Card className={cn("relative z-[1] flex w-full flex-col gap-4", className)} background="base" border="multiColor">
      <Image
        src={profileCardBackground}
        alt="profile card background"
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-center opacity-50"
        priority={true}
      />
      <div className="flex flex-row items-center justify-between gap-1 sm:hidden">
        <Avatar src={avatarUrl} alt={login} size="xl" />
        <div className="flex flex-col justify-end gap-2">
          <Typography variant="title-m" className="text-right">
            {getOrdinalSuffix(rank)}
          </Typography>
          {rankPercentile && rankPercentile !== 100 ? (
            <Typography
              variant="body-s"
              className="whitespace-nowrap text-right text-spaceBlue-100"
              translate={{
                token: "v2.features.profileCard.rank",
                params: { count: `${rankPercentile}` },
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="relative z-[1] flex gap-4 max-[400px]:flex-wrap">
        <Avatar src={avatarUrl} alt={login} size="3xl" className="hidden sm:flex" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex justify-between gap-2">
            <Typography variant="title-m" className="line-clamp-1 capitalize">
              {!isInPopover ? (
                <BaseLink
                  href={NEXT_ROUTER.publicProfile.root(login)}
                  className="transition-all hover:text-spacePurple-500"
                >
                  {login}
                </BaseLink>
              ) : (
                <>{login}</>
              )}
            </Typography>
            <Typography variant="title-m" className="hidden sm:block">
              {getOrdinalSuffix(rank)}
            </Typography>
          </div>
          <div className="flex justify-between gap-2">
            <RankCategory rankCategory={rankCategory} hasPopover={!isInPopover} />
            {rankPercentile && rankPercentile !== 100 ? (
              <Typography
                variant="body-s"
                className="hidden whitespace-nowrap text-spaceBlue-100 sm:block"
                translate={{
                  token: "v2.features.profileCard.rank",
                  params: { count: `${rankPercentile}` },
                }}
              />
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <ProfileStatItem
              icon="ri-stack-line"
              token="v2.features.profileCard.counters.contributionCount"
              count={contributionCount}
            />
            <span>•</span>
            <ProfileStatItem
              icon="ri-medal-2-fill"
              token="v2.features.profileCard.counters.rewardCount"
              count={rewardCount}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag size="medium">
          <Icon remixName="ri-user-line" size={16} />
          <Translate
            token="v2.features.profileCard.counters.contributedProjectCount"
            params={{ count: contributedProjectCount ?? 0 }}
          />
        </Tag>
        <Tag size="medium">
          <Icon remixName="ri-star-line" size={16} />
          <Translate
            token="v2.features.profileCard.counters.leadedProjectCount"
            params={{ count: leadedProjectCount ?? 0 }}
          />
        </Tag>
      </div>
    </Card>
  );
}

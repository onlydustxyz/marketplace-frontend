import { rankCategoryMapping } from "api-client/resources/users/types";
import { Money } from "utils/Money/Money";

import { TLeaderBoard } from "app/(v1)/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.types";

import { cn } from "src/utils/cn";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Contributor } from "components/features/contributor/contributor";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

function LeaderBoardItem({ contributor, sortBy }: TLeaderBoard.LeaderBoardItemProps) {
  return (
    <BaseLink
      href={NEXT_ROUTER.publicProfile.root(contributor.login)}
      className="group flex w-full items-center gap-3 px-3 py-4 transition-all hover:bg-card-background-medium sm:gap-5 sm:px-5 sm:py-6"
    >
      <div className="justify-start">{`#${contributor.dynamicRank}`}</div>
      <AvatarLabelled
        avatarProps={{ src: contributor.avatarUrl, alt: contributor.login, size: "l", shape: "square" }}
        labelProps={{ title: contributor.login }}
        className="col-span-3 flex-1"
      >
        <Contributor
          githubUserId={contributor.githubUserId}
          login={contributor.login}
          isRegistered={false}
          clickable={false}
          typograhy={{ className: "!od-text-title-s hover:text-spacePurple-500 transition-all capitalize" }}
        />
        <Typography
          variant="body-s"
          className="line-clamp-1 text-spaceBlue-100"
          translate={{ token: rankCategoryMapping[contributor.globalRankCategory] }}
        />
      </AvatarLabelled>
      {sortBy === "CONTRIBUTION_COUNT" ? (
        <div className="flex min-w-[15%] justify-end gap-2">
          <Typography variant="body-l">{contributor.contributionCount}</Typography>
          <Icon remixName="ri-stack-line" size={24} />
        </div>
      ) : null}
      {sortBy === "TOTAL_EARNED" ? (
        <div className="flex min-w-[10%] justify-end">
          <Typography variant="body-l">
            {
              Money.format({
                amount: contributor.totalEarnedUsd,
                currency: Money.USD,
                options: { currencyClassName: "od-text-body-s" },
              }).html
            }
          </Typography>
        </div>
      ) : null}
      <Icon remixName="ri-arrow-right-s-line" className="transition-all group-hover:translate-x-1" size={24} />
    </BaseLink>
  );
}

export function LeaderBoard({ contributors, sortBy, className }: TLeaderBoard.LeaderBoardProps) {
  if (!contributors?.length) return null;

  return (
    <Card
      className={cn("relative flex w-full flex-col divide-y divide-card-border-light", className)}
      background="base"
      hasPadding={false}
    >
      <Typography
        variant="title-s"
        translate={{
          token:
            sortBy === "CONTRIBUTION_COUNT"
              ? "v2.pages.ecosystems.detail.leaderBoard.totalContributionsSubtitle"
              : "v2.pages.ecosystems.detail.leaderBoard.totalEarnedSubtitle",
        }}
        className="px-3 py-4 sm:px-5 sm:py-6"
      />
      {contributors?.map(contributor => (
        <LeaderBoardItem key={contributor.githubUserId} contributor={contributor} sortBy={sortBy} />
      ))}
    </Card>
  );
}

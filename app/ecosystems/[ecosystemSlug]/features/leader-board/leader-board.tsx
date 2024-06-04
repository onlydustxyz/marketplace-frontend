import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { rankCategoryMapping } from "api-client/resources/users/types";
import { Money } from "utils/Money/Money";

import { TLeaderBoard } from "app/ecosystems/[ecosystemSlug]/features/leader-board/leader-board.types";

import { cn } from "src/utils/cn";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Contributor } from "components/features/contributor/contributor";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

function LeaderBoardItem({ contributor, sortBy }: TLeaderBoard.LeaderBoardItemProps) {
  return (
    <div className="flex items-center gap-2 px-5 py-6">
      <div className="min-w-[36px] justify-start">{`#${contributor.dynamicRank}`}</div>
      <AvatarLabelled
        avatarProps={{ src: contributor.avatarUrl, alt: contributor.login, size: "l", shape: "square" }}
        labelProps={{ title: contributor.login }}
        className="col-span-3 flex-1"
      >
        <ClientOnly>
          <Contributor
            githubUserId={contributor.githubUserId}
            login={contributor.login}
            isRegistered={false}
            clickable
            typograhy={{ className: "!od-text-title-s hover:text-spacePurple-500 transition-all capitalize" }}
          />
        </ClientOnly>
        <Typography
          variant="body-s"
          className="line-clamp-2 text-spaceBlue-100"
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
    </div>
  );
}

export async function LeaderBoard({ ecosystemSlug, sortBy, className }: TLeaderBoard.LeaderBoardProps) {
  const contributors = await ecosystemsApiClient.fetch
    .getEcosystemContributorsBySlug(
      { ecosystemSlug },
      {
        sort: sortBy,
      },
      {
        pageSize: 5,
        pageIndex: 0,
      }
    )
    .request({
      next: { revalidate: 120 },
    })
    .then(res => res.contributors);

  if (!contributors?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <Typography
        variant="title-s"
        translate={{
          token:
            sortBy === "CONTRIBUTION_COUNT"
              ? "v2.pages.ecosystems.detail.leaderBoard.totalContributionsSubtitle"
              : "v2.pages.ecosystems.detail.leaderBoard.totalEarnedSubtitle",
        }}
      />
      <Card
        className={cn("relative flex w-full flex-col divide-y divide-card-border-light", className)}
        background="base"
        hasPadding={false}
      >
        {contributors?.map(contributor => (
          <LeaderBoardItem key={contributor.githubUserId} contributor={contributor} sortBy={sortBy} />
        ))}
      </Card>
    </div>
  );
}

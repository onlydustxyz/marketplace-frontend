import { ComponentProps } from "react";

import { GetAllContributionsQuery } from "src/__generated/graphql";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import TimeLine from "src/icons/TimeLine";
import { GithubContributionStatus } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";

export function ContributionCard({
  contribution,
  status,
}: {
  contribution: GetAllContributionsQuery["contributions"][number];
  status: GithubContributionStatus;
}) {
  const { T } = useIntl();
  const date = status === GithubContributionStatus.InProgress ? contribution.createdAt : contribution.closedAt;

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-greyscale-50/8 bg-white/2 p-4">
      <ContributionProjectRepo
        project={contribution.project as ComponentProps<typeof ContributionProjectRepo>["project"]}
        repo={contribution.githubRepo as ComponentProps<typeof ContributionProjectRepo>["repo"]}
      />
      <Contribution contribution={contribution} isMobile />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-spaceBlue-200">
          <TimeLine className="flex h-4 items-center" />
          <span className="text-xs leading-none">{displayRelativeDate(date)}</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-spaceBlue-200">
            <ArrowRightUpLine className="flex h-4 items-center" />
            <span className="text-xs leading-none">{T("contributions.table.linkedTo")}</span>
          </div>
          {/* TODO badges */}
        </div>
      </div>
    </article>
  );
}

import { ComponentProps } from "react";

import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import TimeLine from "src/icons/TimeLine";
import { GithubContributionStatus, QueryContribution } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";

export function ContributionCard({
  contribution,
  status,
}: {
  contribution: QueryContribution;
  status: GithubContributionStatus;
}) {
  const { T } = useIntl();
  const date = status === GithubContributionStatus.InProgress ? contribution.createdAt : contribution.closedAt;

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-greyscale-50/8 bg-white/2 p-4 font-walsheim">
      <ContributionProjectRepo
        project={contribution.project as ComponentProps<typeof ContributionProjectRepo>["project"]}
        repo={contribution.githubRepo as ComponentProps<typeof ContributionProjectRepo>["repo"]}
      />
      <Contribution contribution={contribution} isMobile />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-spaceBlue-200">
          <TimeLine className="text-base leading-none" />
          <span className="text-xs leading-none">{displayRelativeDate(date)}</span>
        </div>

        {ContributionLinked({ contribution }) ? (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-spaceBlue-200">
              <ArrowRightUpLine className="text-base leading-none" />
              <span className="text-xs leading-none">{T("contributions.table.linkedTo")}</span>
            </div>
            <div className="flex items-center gap-1">
              <ContributionLinked contribution={contribution} />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

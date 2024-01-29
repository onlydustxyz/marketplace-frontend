import { useMatch } from "react-router-dom";

import { RoutePaths } from "src/App";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT } from "src/types";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";

import Contributor from "../Contributor";

export function ContributionCard({ contribution, className }: { contribution: ContributionT; className?: string }) {
  const { T } = useIntl();
  const isMyContribution = Boolean(useMatch(`${RoutePaths.Contributions}/*`));

  const date =
    contribution.status === ContributionStatus.InProgress ? contribution.createdAt : contribution.completedAt;

  return (
    <article
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-card-border-light bg-card-background-base p-4 font-walsheim",
        className
      )}
    >
      {isMyContribution ? (
        <ContributionProjectRepo project={contribution.project} repo={contribution.repo} />
      ) : (
        <div className="inline-flex">
          <Contributor contributor={contribution.contributor} clickable />
        </div>
      )}

      <Contribution contribution={contribution} isMobile />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-spaceBlue-200">
          <TimeLine className="text-base leading-none" />
          <span className="text-xs leading-none first-letter:uppercase">{displayRelativeDate(date ?? "")}</span>
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

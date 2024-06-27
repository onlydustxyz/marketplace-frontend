import { ReactNode } from "react";

import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT } from "src/types";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { Tag } from "components/atoms/tag";
import { Contributor } from "components/features/contributor/contributor";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useMatchPath } from "hooks/router/useMatchPath";
import { useIntl } from "hooks/translate/use-translate";

export function ContributionCard({
  contribution,
  className,
  applicants,
  action,
}: {
  contribution: ContributionT;
  className?: string;
  applicants?: number;
  action?: ReactNode;
}) {
  const { T } = useIntl();

  const isMyContribution = useMatchPath(NEXT_ROUTER.contributions.all, { exact: false });

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
          <Contributor
            githubUserId={contribution.contributor.githubUserId}
            login={contribution.contributor.login}
            avatarUrl={contribution.contributor.avatarUrl}
            isRegistered={contribution.contributor.isRegistered}
          />
        </div>
      )}

      <Contribution contribution={contribution} isMobile />

      {typeof applicants !== "undefined" ? (
        <div className={"inline-flex"}>
          <Tag size={"xs"} style={"outline"}>
            <Translate
              token={"v2.pages.project.applications.table.rows.countApplicants"}
              params={{ count: applicants }}
            />
          </Tag>
        </div>
      ) : null}

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

        {action ? action : null}
      </div>
    </article>
  );
}

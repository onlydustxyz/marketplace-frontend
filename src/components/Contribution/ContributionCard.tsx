import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import TimeLine from "src/icons/TimeLine";
import { Contribution as ContributionT, ContributionStatus } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";

export function ContributionCard({ contribution }: { contribution: ContributionT }) {
  const { T } = useIntl();
  const date =
    contribution.status === ContributionStatus.InProgress ? contribution.createdAt : contribution.completedAt;

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-greyscale-50/8 bg-white/2 p-4 font-walsheim">
      <ContributionProjectRepo project={contribution.project} repo={contribution.repo} />
      <Contribution contribution={contribution} isMobile />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-spaceBlue-200">
          <TimeLine className="text-base leading-none" />
          <span className="text-xs leading-none">{displayRelativeDate(date ?? "")}</span>
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

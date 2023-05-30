import Card from "src/components/Card";
import RoundedImage from "src/components/RoundedImage";
import Tag, { TagSize } from "src/components/Tag";
import User3Line from "src/icons/User3Line";
import FundsLine from "src/icons/FundsLine";
import { formatMoneyAmount } from "src/utils/money";
import StarLine from "src/icons/StarLine";
import { useIntl } from "src/hooks/useIntl";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";

export type Project = {
  id: string;
  logoUrl: string;
  name: string;
  contributorCount: number;
  totalGranted: number;
  leadSince?: Date;
  lastContribution: Date;
  contributionCount: number;
};

export default function ProjectCard({
  id,
  logoUrl,
  name,
  contributorCount,
  totalGranted,
  leadSince,
  contributionCount,
  lastContribution,
}: Project) {
  const { T } = useIntl();

  return (
    <Link to={generatePath(RoutePaths.ProjectDetails, { projectId: id })}>
      <Card blurred selectable padded={false} className="flex flex-col bg-noise-light">
        <div className="flex flex-col p-4 gap-3">
          <RoundedImage src={logoUrl} alt={name} />
          <div className="flex flex-col gap-2">
            <div className="font-belwe font-normal text-base text-greyscale-50">{name}</div>
            <div className="flex flex-row items-center justify-between">
              <Tag size={TagSize.Small}>
                <User3Line /> {contributorCount}
              </Tag>
              <Tag size={TagSize.Small}>
                <FundsLine /> {formatMoneyAmount({ amount: totalGranted, notation: "compact" })}
              </Tag>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-3 gap-1 h-full bg-white/5 rounded-b-2xl border-t border-greyscale-50/8">
          <div className="font-walsheim font-medium text-sm text-greyscale-50">
            {leadSince ? (
              <div className="flex flex-row items-center gap-1">
                <StarLine className="text-base" /> {T("profile.sections.projects.projectLead")}
              </div>
            ) : (
              <>{T("profile.sections.projects.contributionCount", { count: contributionCount })}</>
            )}
          </div>
          <div className="font-walsheim font-medium text-xs text-greyscale-200">
            {leadSince ? (
              <>{T("profile.sections.projects.projectLeadSince", { since: displayRelativeDate(leadSince) })}</>
            ) : (
              <>
                {T("profile.sections.projects.lastContribution", {
                  lastContribution: displayRelativeDate(lastContribution),
                })}
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

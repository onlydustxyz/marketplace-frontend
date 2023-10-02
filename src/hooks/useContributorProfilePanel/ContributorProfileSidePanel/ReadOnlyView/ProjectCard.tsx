import Card from "src/components/Card";
import RoundedImage from "src/components/RoundedImage";
import Tag, { TagSize } from "src/components/Tag";
import User3Line from "src/icons/User3Line";
import FundsLine from "src/icons/FundsLine";
import { formatMoneyAmount } from "src/utils/money";
import StarLine from "src/icons/StarLine";
import { useIntl } from "src/hooks/useIntl";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { withTooltip } from "src/components/Tooltip";
import PrivateTag from "src/components/PrivateTag";

export type Project = {
  id: string;
  key: string;
  logoUrl: string;
  name: string;
  contributorCount: number;
  totalGranted: number;
  leadSince?: Date;
  lastContribution?: Date;
  contributionCount?: number;
  private?: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  const {
    logoUrl,
    name,
    contributorCount,
    totalGranted,
    leadSince,
    contributionCount,
    lastContribution,
    private: private_,
  } = project;

  const { T } = useIntl();

  return (
    <Card selectable padded={false} withBg={false} className="flex h-full flex-col bg-noise-light">
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="relative w-fit">
          <RoundedImage src={logoUrl} alt={name} />
          {private_ && (
            <div className="absolute -bottom-2.5 -right-2.5">
              <PrivateTag />
            </div>
          )}
        </div>
        <div className="flex h-full flex-col gap-2">
          <div className="truncate font-belwe text-base font-normal text-greyscale-50">{name}</div>
          <div className="flex flex-row flex-wrap items-center gap-1">
            <Tag
              size={TagSize.Small}
              {...withTooltip(T("profile.sections.projects.contributorCount"), { className: "w-fit" })}
            >
              <User3Line /> {contributorCount}
            </Tag>
            <Tag
              size={TagSize.Small}
              {...withTooltip(T("profile.sections.projects.moneyGranted"), { className: "w-fit" })}
            >
              <FundsLine /> {formatMoneyAmount({ amount: totalGranted, notation: "compact" })}
            </Tag>
          </div>
        </div>
      </div>
      <div className="flex h-fit flex-col gap-1 rounded-b-2xl border-t border-greyscale-50/8 bg-white/5 px-4 py-3">
        <div className="font-walsheim text-sm font-medium text-greyscale-50">
          {leadSince ? (
            <div className="flex flex-row items-center gap-1">
              <StarLine className="text-base" /> {T("profile.sections.projects.projectLead")}
            </div>
          ) : (
            <>{T("profile.sections.projects.contributionCount", { count: contributionCount })}</>
          )}
        </div>
        <div className="font-walsheim text-xs font-medium text-greyscale-200">
          {leadSince ? (
            <>{T("profile.sections.projects.projectLeadSince", { since: displayRelativeDate(leadSince) })}</>
          ) : (
            lastContribution && (
              <>
                {T("profile.sections.projects.lastContribution", {
                  lastContribution: displayRelativeDate(lastContribution),
                })}
              </>
            )
          )}
        </div>
      </div>
    </Card>
  );
}

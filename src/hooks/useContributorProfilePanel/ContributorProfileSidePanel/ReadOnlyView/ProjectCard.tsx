import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { components } from "src/__generated/api";
import Card from "src/components/Card";
import PrivateTag from "src/components/PrivateTag";
import RoundedImage from "src/components/RoundedImage";
import Tag, { TagSize } from "src/components/Tag";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import FundsLine from "src/icons/FundsLine";
import StarLine from "src/icons/StarLine";
import User3Line from "src/icons/User3Line";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { formatMoneyAmount } from "src/utils/money";

export default function ProjectCard({ project }: { project: components["schemas"]["UserProfileProjects"] }) {
  const {
    logoUrl,
    name,
    contributorCount,
    totalGranted,
    leadSince,
    userContributionCount,
    userLastContributedAt,
    visibility,
  } = project;

  const isPrivate = visibility === "PRIVATE";

  const { T } = useIntl();

  return (
    <Card selectable padded={false} withBg={false} className="flex h-full flex-col bg-noise-light">
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="relative w-fit">
          <RoundedImage src={logoUrl || onlyDustLogo} alt={name} />
          {isPrivate && (
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
            T("profile.sections.projects.contributionCount", { count: userContributionCount })
          )}
        </div>
        <div className="font-walsheim text-xs font-medium text-greyscale-200">
          {leadSince
            ? T("profile.sections.projects.projectLeadSince", { since: displayRelativeDate(new Date(leadSince)) })
            : userLastContributedAt &&
              T("profile.sections.projects.lastContribution", {
                lastContribution: displayRelativeDate(new Date(userLastContributedAt)),
              })}
        </div>
      </div>
    </Card>
  );
}

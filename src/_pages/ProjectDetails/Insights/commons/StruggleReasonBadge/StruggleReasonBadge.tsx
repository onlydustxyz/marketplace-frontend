import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";
import { calculateDaysAgo, getColorClass } from "./StruggleReasonBadge.utils";
import { ReasonRanges, StruggleReasonBadgeProps } from "./StruggleReasonBadge.type";

const Bar = ({ daysAgo, height }: { daysAgo: number; height: number }) => (
  <div
    className={cn(`h-${height} w-1`, {
      "bg-struggleBadge-bar-solid-green": daysAgo < ReasonRanges.GreenStatus,
      "bg-struggleBadge-bar-fade-green": daysAgo < ReasonRanges.GreenStatus && height > 2,
      "bg-struggleBadge-bar-solid-orange": daysAgo >= ReasonRanges.GreenStatus && daysAgo < ReasonRanges.OrangeStatus,
      "bg-struggleBadge-bar-fade-orange":
        daysAgo >= ReasonRanges.GreenStatus && daysAgo < ReasonRanges.OrangeStatus && height > 2,
      "bg-struggleBadge-bar-solid-red": daysAgo >= ReasonRanges.RedStatus,
    })}
  />
);

export default function StruggleReasonBadge({ date, githubStatus }: StruggleReasonBadgeProps) {
  const { T } = useIntl();
  const daysAgo = calculateDaysAgo(date);
  const colorClass = getColorClass(daysAgo);

  return (
    <div className={`flex flex-row items-center gap-2 rounded-xl px-3 py-2 ${colorClass}`}>
      <div className="flex h-4 flex-row items-end justify-center gap-1">
        {[2, 3, 4].map(height => (
          <Bar key={height} daysAgo={daysAgo} height={height} />
        ))}
      </div>
      <div>
        <span className="mr-1 capitalize">{githubStatus.toLowerCase()}</span>
        {T("project.details.insights.staled.badge.days", { days: daysAgo })}
      </div>
    </div>
  );
}

import { useIntl } from "hooks/translate/use-translate";

import Bar from "./SruggleReasonBar";
import { StruggleReasonBadgeProps } from "./StruggleReasonBadge.type";
import { calculateDaysAgo, getColorClass } from "./StruggleReasonBadge.utils";

export default function StruggleReasonBadge({ date, githubStatus }: StruggleReasonBadgeProps) {
  const { T } = useIntl();
  const daysAgo = calculateDaysAgo(date);
  const colorClass = getColorClass(daysAgo);

  return (
    <div className={`flex flex-row items-center gap-2 rounded-xl px-3 py-2 ${colorClass}`}>
      <div className="flex flex-row items-end justify-center gap-0.5">
        {[4, 10, 16].map(height => (
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

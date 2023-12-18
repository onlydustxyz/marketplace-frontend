import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

type StruggleReasonBadgeProps = {
  date: string;
  githubStatus: string;
};

const calculateDaysAgo = (dateString: string): number => {
  const today = new Date();
  const lastUpdated = new Date(dateString);
  const differenceInTime = today.getTime() - lastUpdated.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

const getColorClass = (daysAgo: number): string => {
  if (daysAgo >= 30) {
    return "bg-struggleBadge-background-red text-struggleBadge-text-red";
  } else if (daysAgo >= 20) {
    return "bg-struggleBadge-background-orange text-struggleBadge-text-orange";
  } else if (daysAgo <= 10) {
    return "bg-struggleBadge-background-green text-struggleBadge-text-green";
  }
  return "";
};

const Bar = ({ daysAgo, height }: { daysAgo: number; height: number }) => (
  <div
    className={cn(`h-${height} w-1`, {
      "bg-struggleBadge-bar-solid-green": daysAgo < 10,
      "bg-struggleBadge-bar-fade-green": daysAgo < 10 && height > 2,
      "bg-struggleBadge-bar-solid-orange": daysAgo < 20 && daysAgo >= 10,
      "bg-struggleBadge-bar-fade-orange": daysAgo < 20 && daysAgo >= 10 && height > 2,
      "bg-struggleBadge-bar-solid-red": daysAgo >= 30,
    })}
  />
);

export default function StruggleReasonBadge({ date, githubStatus }: StruggleReasonBadgeProps) {
  const { T } = useIntl();
  const daysAgo = calculateDaysAgo(date);
  const colorClass = getColorClass(daysAgo);

  return (
    <div className={`struggle-reason flex flex-row gap-2 rounded-xl px-3 py-2 ${colorClass}`}>
      <div className="flex flex-row items-end justify-center gap-1">
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

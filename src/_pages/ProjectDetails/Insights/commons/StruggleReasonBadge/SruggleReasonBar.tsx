import { ReasonStatuses } from "./StruggleReasonBadge.type";
import { getRangeKey } from "./StruggleReasonBadge.utils";

export default function Bar({ daysAgo, height }: { daysAgo: number; height: number }) {
  const colorClasses: Record<number, Record<string, string>> = {
    [ReasonStatuses.GreenStatus]: {
      "2": "bg-struggleBadge-bar-solid-green",
      "3": "bg-struggleBadge-bar-fade-green",
      "4": "bg-struggleBadge-bar-fade-green",
    },
    [ReasonStatuses.OrangeStatus]: {
      "2": "bg-struggleBadge-bar-solid-orange",
      "3": "bg-struggleBadge-bar-solid-orange",
      "4": "bg-struggleBadge-bar-fade-orange",
    },
    [ReasonStatuses.RedStatus]: {
      "2": "bg-struggleBadge-bar-solid-red",
      "3": "bg-struggleBadge-bar-solid-red",
      "4": "bg-struggleBadge-bar-solid-red",
    },
  };

  const rangeKey = getRangeKey(daysAgo);
  const heightKey = height.toString();
  const colorClass = colorClasses[rangeKey][heightKey] || "";

  return <div className={`h-${height} w-1 ${colorClass}`} />;
}

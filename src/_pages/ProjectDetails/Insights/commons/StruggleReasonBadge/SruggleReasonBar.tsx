import { ReasonStatuses } from "./StruggleReasonBadge.type";
import { getRangeKey } from "./StruggleReasonBadge.utils";

export default function Bar({ daysAgo, height }: { daysAgo: number; height: number }) {
  const colorClasses: Record<ReasonStatuses, Record<string, string>> = {
    [ReasonStatuses.GreenStatus]: {
      "4": "bg-struggleBadge-bar-solid-green",
      "10": "bg-struggleBadge-bar-fade-green",
      "16": "bg-struggleBadge-bar-fade-green",
    },
    [ReasonStatuses.OrangeStatus]: {
      "4": "bg-struggleBadge-bar-solid-orange",
      "10": "bg-struggleBadge-bar-solid-orange",
      "16": "bg-struggleBadge-bar-fade-orange",
    },
    [ReasonStatuses.RedStatus]: {
      "4": "bg-struggleBadge-bar-solid-red",
      "10": "bg-struggleBadge-bar-solid-red",
      "16": "bg-struggleBadge-bar-solid-red",
    },
  };

  const rangeKey = getRangeKey(daysAgo);
  const heightKey = height.toString();
  const colorClass = colorClasses[rangeKey][heightKey] || "";

  return <div className={`w-1 ${colorClass}`} style={{ height }} />;
}

import { ReasonRanges } from "./StruggleReasonBadge.type";

export default function Bar({ daysAgo, height }: { daysAgo: number; height: number }) {
  const colorClasses: Record<number, Record<string, string>> = {
    [ReasonRanges.GreenStatus]: {
      "2": "bg-struggleBadge-bar-solid-green",
      "3": "bg-struggleBadge-bar-fade-green",
      "4": "bg-struggleBadge-bar-fade-green",
    },
    [ReasonRanges.OrangeStatus]: {
      "2": "bg-struggleBadge-bar-solid-orange",
      "3": "bg-struggleBadge-bar-solid-orange",
      "4": "bg-struggleBadge-bar-fade-orange",
    },
    [ReasonRanges.RedStatus]: {
      "2": "bg-struggleBadge-bar-solid-red",
      "3": "bg-struggleBadge-bar-solid-red",
      "4": "bg-struggleBadge-bar-solid-red",
    },
  };

  let rangeKey: number;
  if (daysAgo >= ReasonRanges.GreenStatus && daysAgo < ReasonRanges.OrangeStatus) {
    rangeKey = ReasonRanges.GreenStatus;
  } else if (daysAgo >= ReasonRanges.OrangeStatus && daysAgo < ReasonRanges.RedStatus) {
    rangeKey = ReasonRanges.OrangeStatus;
  } else {
    rangeKey = ReasonRanges.RedStatus;
  }

  const heightKey = height.toString();
  const colorClass = colorClasses[rangeKey][heightKey] || "";

  return <div className={`h-${height} w-1 ${colorClass}`} />;
}

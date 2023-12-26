import { ColorClassesType, ReasonStatuses } from "./StruggleReasonBadge.type";

const calculateDaysAgo = (dateString: string): number => {
  const today = new Date();
  const lastUpdated = new Date(dateString);
  const differenceInTime = today.getTime() - lastUpdated.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

const getRangeKey = (daysAgo: number): ReasonStatuses => {
  if (daysAgo >= ReasonStatuses.RedStatus) {
    return ReasonStatuses.RedStatus;
  } else if (daysAgo >= ReasonStatuses.OrangeStatus) {
    return ReasonStatuses.OrangeStatus;
  } else {
    return ReasonStatuses.GreenStatus;
  }
};

const colorClasses: ColorClassesType = {
  [ReasonStatuses.GreenStatus]: "bg-struggleBadge-background-green text-struggleBadge-text-green",
  [ReasonStatuses.OrangeStatus]: "bg-struggleBadge-background-orange text-struggleBadge-text-orange",
  [ReasonStatuses.RedStatus]: "bg-struggleBadge-background-red text-struggleBadge-text-red",
};

const getColorClass = (daysAgo: number): string => {
  const rangeKey = getRangeKey(daysAgo);
  return colorClasses[rangeKey as ReasonStatuses];
};

export { calculateDaysAgo, getColorClass, getRangeKey };

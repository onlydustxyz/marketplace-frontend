import { ReasonRanges } from "./StruggleReasonBadge.type";

const calculateDaysAgo = (dateString: string): number => {
  const today = new Date();
  const lastUpdated = new Date(dateString);
  const differenceInTime = today.getTime() - lastUpdated.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

const getColorClass = (daysAgo: number): string => {
  if (daysAgo >= ReasonRanges.RedStatus) {
    return "bg-struggleBadge-background-red text-struggleBadge-text-red";
  } else if (daysAgo >= ReasonRanges.OrangeStatus) {
    return "bg-struggleBadge-background-orange text-struggleBadge-text-orange";
  } else if (daysAgo < ReasonRanges.GreenStatus) {
    return "bg-struggleBadge-background-green text-struggleBadge-text-green";
  }
  return "";
};

export { calculateDaysAgo, getColorClass };

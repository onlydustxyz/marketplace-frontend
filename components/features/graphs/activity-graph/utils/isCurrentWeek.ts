import { isSameWeek } from "date-fns";

export function isCurrentWeek(date: Date): boolean {
  return isSameWeek(new Date(), date);
}

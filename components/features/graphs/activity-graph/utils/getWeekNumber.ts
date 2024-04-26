import { format } from "date-fns";

export function getWeekNumber(date: Date, options?: { hideMonths: boolean }): string {
  if (options?.hideMonths) {
    return format(date, "w yyyy");
  }
  return format(date, "w, MMM yyyy");
}

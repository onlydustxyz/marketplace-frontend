import { format, startOfWeek } from "date-fns";

export function getWeekId(date: Date) {
  return format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
}

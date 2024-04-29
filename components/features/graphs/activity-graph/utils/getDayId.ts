import { format } from "date-fns";

export function getDayId(date: Date) {
  return format(date, "yyyy-MM-dd");
}

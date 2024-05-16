import { setWeek, setYear, startOfWeek, startOfYear } from "date-fns";

export function getDateFromWeekNumber(year: number, weekNumber: number) {
  return startOfWeek(setWeek(startOfYear(setYear(new Date(), year)), weekNumber), { weekStartsOn: 1 });
}

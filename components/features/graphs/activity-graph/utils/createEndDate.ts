import { addWeeks } from "date-fns";

export function createEndDate(endDate?: Date) {
  if (endDate) {
    return addWeeks(endDate, 1);
  }
  return addWeeks(new Date(), 1);
}

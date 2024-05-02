import { subWeeks } from "date-fns";

import { ACTIVITY_WEEK_NUMBER } from "components/features/graphs/activity-graph/use-activity-graph";

export function createStartDate(endDate?: Date) {
  if (endDate) {
    return subWeeks(endDate, ACTIVITY_WEEK_NUMBER);
  }
  return subWeeks(new Date(), ACTIVITY_WEEK_NUMBER);
}

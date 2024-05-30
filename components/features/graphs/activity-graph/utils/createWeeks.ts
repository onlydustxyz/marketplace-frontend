import { eachWeekOfInterval, endOfWeek, startOfWeek } from "date-fns";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";

export function createWeeks({ start, end }: { start: Date; end: Date }): TActivityGraph.Week[] {
  const eachWeek = eachWeekOfInterval({
    start,
    end,
  });

  return eachWeek.map(week => {
    const startWeek = startOfWeek(week, { weekStartsOn: 1 });
    const endWeek = endOfWeek(week, { weekStartsOn: 1 });

    return {
      id: getWeekId(week),
      startDate: startWeek,
      endDate: endWeek,
    };
  });
}

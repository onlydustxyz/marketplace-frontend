import { eachDayOfInterval, eachWeekOfInterval, endOfWeek, startOfWeek } from "date-fns";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDayId } from "components/features/graphs/activity-graph/utils/getDayId";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";

export function createWeeks({ start, end }: { start: Date; end: Date }): TActivityGraph.Week[] {
  const eachWeek = eachWeekOfInterval({
    start,
    end,
  });

  return eachWeek.map(week => {
    const startWeek = startOfWeek(week, { weekStartsOn: 1 });
    const endWeek = endOfWeek(week, { weekStartsOn: 1 });
    const eachDay = eachDayOfInterval({
      start: startWeek,
      end: endWeek,
    });

    return {
      id: getWeekId(week),
      startDate: startWeek,
      endDate: endWeek,
      days: eachDay.map(day => ({ date: day, id: getDayId(day) })),
    };
  });
}

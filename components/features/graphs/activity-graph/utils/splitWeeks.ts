import { ACTIVITY_NUMBER_OF_ROW, TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export function splitWeeksIntoSubArray({ weeks }: { weeks: TActivityGraph.Week[] }): TActivityGraph.Week[][] {
  return weeks.reduce((acc, week, index) => {
    if (index % ACTIVITY_NUMBER_OF_ROW === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(week);
    return acc;
  }, [] as TActivityGraph.Week[][]);
}

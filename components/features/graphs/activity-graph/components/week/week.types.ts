import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export namespace TWeek {
  export interface Props {
    week: TActivityGraph.Week;
    data?: TActivityGraph.WeekData<unknown>;
  }
}

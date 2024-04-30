import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export namespace TRow {
  export interface Props {
    weeks: TActivityGraph.Week[];
    data: { [key: string]: TActivityGraph.WeekData<unknown> };
    asLabel?: boolean;
    isLastRow?: boolean;
  }
}

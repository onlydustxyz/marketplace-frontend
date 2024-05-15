import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export function getLevelFromCount(
  range: { [key in TActivityGraph.level]: number },
  count: number
): TActivityGraph.level {
  if (count < range[1]) {
    return 1;
  } else if (count < range[2]) {
    return 2;
  } else if (count < range[3]) {
    return 3;
  } else {
    return 4;
  }
}

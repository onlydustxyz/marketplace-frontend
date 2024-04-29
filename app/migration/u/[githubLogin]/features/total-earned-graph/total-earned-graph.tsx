import { Card } from "components/ds/card/card";
import { PieChart } from "components/features/charts/pie-chart/pie-chart";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export function TotalEarnedGraph(_: TTotalEarnedGraph.Props) {
  return (
    <Card>
      TotalEarnedGraph
      <PieChart />
    </Card>
  );
}

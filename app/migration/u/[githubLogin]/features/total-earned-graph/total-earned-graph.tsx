import { Card } from "components/ds/card/card";
import { PieChart } from "components/features/charts/pie-chart/pie-chart";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export function TotalEarnedGraph(_: TTotalEarnedGraph.Props) {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  return (
    <Card className="h-110 w-full">
      <PieChart data={data} />
    </Card>
  );
}

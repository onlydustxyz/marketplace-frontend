import { Card } from "components/ds/card/card";
import { PieChart } from "components/features/graphs/pie-chart/pie-chart";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTotalEarnedGraph } from "./total-earned-graph.types";

export function TotalEarnedGraph(_: TTotalEarnedGraph.Props) {
  const data = [
    { id: "g-a", label: "Group A", value: 400 },
    { id: "g-b", label: "Group B", value: 300 },
    { id: "b-c", label: "Group C", value: 300 },
    { id: "g-d", label: "Group D", value: 200 },
  ];

  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.totalEarned" }} />

      <Card>
        <Flex direction="col" alignItems="center" className="gap-2">
          <PieChart data={data} />

          <Typography variant="title-l">221,000 USD</Typography>
        </Flex>
      </Card>
    </Flex>
  );
}

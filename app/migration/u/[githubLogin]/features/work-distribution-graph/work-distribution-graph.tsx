"use client";

import { Card } from "components/ds/card/card";
import { PieChart } from "components/features/graphs/pie-chart/pie-chart";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { TWorkDistributionGraph } from "./work-distribution-graph.types";

export function WorkDistributionGraph(_: TWorkDistributionGraph.Props) {
  const { T } = useIntl();

  const data = [
    { id: "pull-request", label: T("v2.commons.pullRequests"), value: 400, color: "#CE66FF" },
    { id: "issues", label: T("v2.commons.issues"), value: 300, color: "#FFBC66" },
    { id: "code-reviews", label: T("v2.commons.codeReviews"), value: 300, color: "#666BD7" },
  ];

  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.workDistribution" }} />

      <Card>
        <PieChart data={data} />
      </Card>
    </Flex>
  );
}

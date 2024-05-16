"use client";

import { useMemo } from "react";

import { ActivityGraphLoading } from "components/features/graphs/activity-graph/activity-graph.loading";
import { Row } from "components/features/graphs/activity-graph/components/row/row";
import { useActivityGraph } from "components/features/graphs/activity-graph/use-activity-graph";

import { TActivityGraph } from "./activity-graph.types";

export function ActivityGraph<T>({ endDate, weekData }: TActivityGraph.Props<T>) {
  const { splitWeeks, weeks } = useActivityGraph({ endDate });

  const data = useMemo(() => {
    return weekData || {};
  }, [weekData, weeks]);

  if (!splitWeeks?.length) {
    return <ActivityGraphLoading />;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1.5">
      {splitWeeks.map((weeks, index) => (
        <Row
          key={index}
          weeks={weeks}
          data={data}
          asLabel={index % 2 !== 1}
          isLastRow={index === splitWeeks.length - 1}
        />
      ))}
    </div>
  );
}

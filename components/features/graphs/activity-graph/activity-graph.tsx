"use client";

import { Button } from "@nextui-org/react";
import { useMemo } from "react";

import { Row } from "components/features/graphs/activity-graph/components/row/row";
import { useActivityGraph } from "components/features/graphs/activity-graph/use-activity-graph";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";

import { TActivityGraph } from "./activity-graph.types";

export function ActivityGraph<T>({ endDate, weekData }: TActivityGraph.Props<T>) {
  const { splitedWeeks, weeks } = useActivityGraph({ endDate });

  const data = useMemo(() => {
    return weekData?.({ getWeekId }) || {};
  }, [weekData, weeks]);

  return (
    <div className="flex w-full flex-row items-start justify-start gap-1">
      <div className="flex flex-col items-start justify-start">
        <Button variant="solid" className="bg-spacePurple-900 text-spacePurple-400">
          2024
        </Button>
        <Button variant="solid" className="bg-transparent text-spaceBlue-200">
          2023
        </Button>
        <Button variant="solid" className="bg-transparent text-spaceBlue-200">
          2022
        </Button>
        <Button variant="solid" className="bg-transparent text-spaceBlue-200">
          2021
        </Button>
      </div>
      <div className="flex w-full flex-1 flex-col items-start justify-end gap-1">
        {splitedWeeks.map((weeks, index) => (
          <Row key={index} weeks={weeks} data={data} />
        ))}
      </div>
    </div>
  );
}

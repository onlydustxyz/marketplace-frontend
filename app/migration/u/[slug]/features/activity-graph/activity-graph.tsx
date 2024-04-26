"use client";

import { subWeeks } from "date-fns";

import { Card } from "components/ds/card/card";
import { ActivityGraph as ActivityGraphComponent } from "components/features/graphs/activity-graph/activity-graph";
import { TIcon } from "components/layout/icon/icon.types";
import { Typography } from "components/layout/typography/typography";

import { TActivityGraph } from "./activity-graph.types";

export function ActivityGraph(_: TActivityGraph.Props) {
  function mockWeekDate(number: number) {
    return subWeeks(new Date(), number);
  }

  const mockTooltipContent = "5 contributions • 2 rewards";
  const mockIcon: TIcon.Props = { remixName: "ri-medal-2-fill" };

  return (
    <div className="flex w-full flex-col gap-4">
      <Typography variant="title-m">Activity per week</Typography>
      <Card background={"base"}>
        <ActivityGraphComponent
          weekData={({ getWeekId }) => ({
            [getWeekId(mockWeekDate(0))]: { level: 4, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(4))]: { level: 3, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(10))]: { level: 4, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(20))]: { level: 2, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(30))]: { level: 4, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(6))]: { level: 3, tooltipContent: mockTooltipContent, icon: mockIcon },
            [getWeekId(mockWeekDate(7))]: { level: 2, tooltipContent: mockTooltipContent, icon: mockIcon },

            [getWeekId(mockWeekDate(2))]: { level: 4, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(8))]: { level: 3, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(13))]: { level: 4, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(25))]: { level: 2, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(45))]: { level: 4, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(42))]: { level: 3, tooltipContent: mockTooltipContent },
            [getWeekId(mockWeekDate(39))]: { level: 2, tooltipContent: mockTooltipContent },
          })}
        />
      </Card>
    </div>
  );
}

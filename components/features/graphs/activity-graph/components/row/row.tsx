import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { Week } from "components/features/graphs/activity-graph/components/week/week";
import { getWeekNumber } from "components/features/graphs/activity-graph/utils/getWeekNumber";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TRow } from "./row.types";

export function Row({ weeks, data, asLabel, isLastRow }: TRow.Props) {
  const lastWeek = useMemo(() => weeks.at(-1), [weeks]);
  const weekNumber = useMemo(
    () => (lastWeek ? getWeekNumber(lastWeek.startDate, { hideMonths: true }) : undefined),
    [lastWeek]
  );

  const findData = (weekId: string) => {
    return data?.[weekId];
  };

  const label = useMemo(() => {
    if (isLastRow) {
      return (
        <div className="flex flex-row items-center justify-start">
          <Icon remixName="ri-arrow-left-s-line" className="h-4 w-4 text-spacePurple-500" />
          <Translate token={"v2.features.activityGraph.currentWeek"} />
        </div>
      );
    }
    return (
      <>
        <Translate token={"v2.features.activityGraph.week"} /> {weekNumber}
      </>
    );
  }, [isLastRow]);

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <div className="flex w-full flex-row items-center justify-start gap-1.5">
        {weeks.map(week => (
          <Week week={week} key={week.id} data={findData(week.id)} />
        ))}
      </div>
      {asLabel ? (
        <Typography
          variant={"body-s"}
          className={cn("w-full whitespace-nowrap text-spaceBlue-300", { "text-spacePurple-500": isLastRow })}
        >
          {label}
        </Typography>
      ) : (
        <div />
      )}
    </div>
  );
}

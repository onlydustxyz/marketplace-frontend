import { format, isSameWeek } from "date-fns";
import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Icon } from "components/layout/icon/icon";

import { TWeek } from "./week.types";

export function Week({ week, data }: TWeek.Props) {
  const weekNumber = useMemo(() => format(week.startDate, "w, MMM yyyy"), [week]);
  const isCurrentWeek = useMemo(() => isSameWeek(new Date(), week.startDate), [week]);

  const tooltipContent = useMemo(
    () => (
      <div className="flex flex-col gap-1">
        <p>Week {weekNumber}</p>
        {data?.tooltipContent ? <p>{data?.tooltipContent}</p> : null}
      </div>
    ),
    [weekNumber, data]
  );
  return (
    <Tooltip content={tooltipContent}>
      <div
        className={cn(
          "flex h-6 w-6 flex-row items-center justify-center rounded-[2px] border border-card-border-light bg-spaceBlue-800",
          {
            "bg-spaceBlue-800": data?.level === 1,
            "bg-spacePurple-800": data?.level === 2,
            "bg-spacePurple-700": data?.level === 3,
            "bg-spacePurple-500": data?.level === 4,
            "rounded-full": isCurrentWeek,
          }
        )}
      >
        {data?.icon ? <Icon {...data.icon} className="h-4 w-4" /> : null}
      </div>
    </Tooltip>
  );
}

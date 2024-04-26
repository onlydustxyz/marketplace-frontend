import { Week } from "components/features/graphs/activity-graph/components/week/week";

import { TRow } from "./row.types";

export function Row({ weeks, data }: TRow.Props) {
  const findData = (weekId: string) => {
    return data?.[weekId];
  };
  return (
    <div className="flex w-full flex-row items-center justify-end gap-1">
      {/*<div className="flex-1">Janv 2024</div>*/}
      <div className="flex flex-row items-center justify-end gap-1">
        {weeks.map(week => (
          <Week week={week} key={week.id} data={findData(week.id)} />
        ))}
      </div>
    </div>
  );
}

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { createEndDate } from "components/features/graphs/activity-graph/utils/createEndDate";
import { createStartDate } from "components/features/graphs/activity-graph/utils/createStartDate";
import { createWeeks } from "components/features/graphs/activity-graph/utils/createWeeks";
import { splitWeeksIntoSubArray } from "components/features/graphs/activity-graph/utils/splitWeeks";

export function OGActivityGraph({ data }: { data: { [key: string]: TActivityGraph.WeekData<unknown> } }) {
  const dates = {
    start: createStartDate(),
    end: createEndDate(),
  };
  const weeks = createWeeks({ ...dates });
  const splitWeeks = splitWeeksIntoSubArray({ weeks });

  console.log("dtes", dates);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", gap: "6px" }}>
      {splitWeeks.map((weeks, index) => (
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", gap: "6px" }}
          key={`${index}`}
        >
          {weeks.map(week => {
            const _data = data?.[week.id];
            return (
              <div
                key={week.id.toString()}
                // convert from tailwind
                style={{
                  display: "flex",
                  height: 24,
                  width: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#1E1E1E",
                  backgroundColor:
                    _data?.level === 1
                      ? "#1E1E1E"
                      : _data?.level === 2
                      ? "#4B4B4B"
                      : _data?.level === 3
                      ? "#6D6D6D"
                      : _data?.level === 4
                      ? "#A1A1A1"
                      : undefined,
                }}
              >
                coucou
                {/*{data?.icon ? <Icon {...data.icon} className="h-4 w-4" /> : null}*/}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

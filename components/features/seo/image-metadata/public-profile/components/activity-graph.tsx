import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { createEndDate } from "components/features/graphs/activity-graph/utils/createEndDate";
import { createStartDate } from "components/features/graphs/activity-graph/utils/createStartDate";
import { createWeeks } from "components/features/graphs/activity-graph/utils/createWeeks";
import { splitWeeksIntoSubArray } from "components/features/graphs/activity-graph/utils/splitWeeks";
import { RewardIcon } from "components/features/seo/image-metadata/public-profile/components/reward-icon";

export function OGActivityGraph({
  data,
}: {
  data: {
    [key: string]: {
      level: TActivityGraph.level;
      reward?: boolean;
    };
  };
}) {
  const dates = {
    start: createStartDate(),
    end: createEndDate(),
  };
  const weeks = createWeeks({ ...dates });
  const splitWeeks = splitWeeksIntoSubArray({ weeks });

  console.log("dtes", splitWeeks);

  const levelColors = {
    1: "#171D44",
    2: "#460066",
    3: "#680099",
    4: "#AE00FF",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "4px",
      }}
    >
      {splitWeeks.map((weeks, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "4px",
          }}
          key={`${index}`}
        >
          {weeks.map(week => {
            const _data = data?.[week.id];
            console.log("data", _data?.level);
            return (
              <div
                key={week.id}
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
                  borderColor: "#F3F0EE14",
                  backgroundColor: levelColors[_data?.level || 1],
                }}
              >
                {_data?.reward ? <RewardIcon /> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { createEndDate } from "components/features/graphs/activity-graph/utils/createEndDate";
import { createStartDate } from "components/features/graphs/activity-graph/utils/createStartDate";
import { createWeeks } from "components/features/graphs/activity-graph/utils/createWeeks";
import { splitWeeksIntoSubArray } from "components/features/graphs/activity-graph/utils/splitWeeks";
import { ActivityHighlight } from "components/features/seo/image-metadata/public-profile/components/activity/activity-highlight";
import { ActivityTitle } from "components/features/seo/image-metadata/public-profile/components/activity/activity-title";
import { ActivityWeek } from "components/features/seo/image-metadata/public-profile/components/activity/activity-week";

interface Props {
  data: {
    [key: string]: {
      level: TActivityGraph.level;
      reward?: boolean;
    };
  };
}
export function OGActivityGraph({ data }: Props) {
  const dates = {
    start: createStartDate(),
    end: createEndDate(),
  };
  const weeks = createWeeks({ ...dates });
  const splitWeeks = splitWeeksIntoSubArray({ weeks });

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          height: "auto",
          border: "1px solid #F3F0EE33",
          background: "#0E0D2E",
          padding: "28px 40px",
          borderRadius: 24,
        }}
      >
        <ActivityTitle />
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
                return <ActivityWeek level={_data?.level || 1} reward={_data?.reward} key={week.id} />;
              })}
            </div>
          ))}
        </div>
        <ActivityHighlight contribution={145} rewards={145} />
      </div>
    </div>
  );
}

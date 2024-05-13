import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { RewardIcon } from "components/features/seo/image-metadata/public-profile/components/reward-icon";

interface Props {
  reward?: boolean;
  level: TActivityGraph.level;
}

export function ActivityWeek({ level, reward }: Props) {
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
        height: 36,
        width: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F3F0EE14",
        backgroundColor: levelColors[level],
      }}
    >
      {reward ? <RewardIcon /> : null}
    </div>
  );
}

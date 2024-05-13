import { RewardIcon } from "components/features/seo/image-metadata/public-profile/components/reward-icon";
import { StackIcon } from "components/features/seo/image-metadata/public-profile/components/stack-icon";

interface Props {
  contribution: number;
  rewards: number;
}
export function ActivityHighlight({ contribution = 0, rewards = 0 }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <StackIcon width={28} height={28} />
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            margin: 0,
          }}
        >
          {contribution}
        </p>
      </div>
      <p
        style={{
          fontSize: "30px",
          fontFamily: "Walsheim",
          color: "#F3F0EE",
          margin: 0,
        }}
      >
        •
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <RewardIcon width={28} height={28} />
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            margin: 0,
          }}
        >
          {rewards}
        </p>
      </div>
    </div>
  );
}

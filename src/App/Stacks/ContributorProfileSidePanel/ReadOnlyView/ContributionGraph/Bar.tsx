import { ContributionCountFragment } from "src/__generated/graphql";

type Props = {
  hoveredBarIndex?: number;
  secondary?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ContributionCountFragment;
  fill?: string;
  opacity?: number;
  index?: number;
  type: "PullRequests" | "Issues" | "CodeReviews";
};

export default function Bar({
  hoveredBarIndex,
  secondary,
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  payload,
  opacity,
  index,
  type,
}: Props) {
  const stripes = secondary;

  const { codeReviewCount, issueCount, pullRequestCount } = payload ?? {};

  // The pull request bar is at the bottom so it's only rounded when it's the only one
  const pullRequestsRounded =
    type === "PullRequests" && pullRequestCount > 0 && issueCount === 0 && codeReviewCount === 0;

  const issuesRounded = type === "Issues" && issueCount > 0 && codeReviewCount === 0;

  // The code review bar is on top so it's always rounded
  const codeReviewsRounded = type === "CodeReviews";

  const rounded = pullRequestsRounded || issuesRounded || codeReviewsRounded;

  return (
    <>
      <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
        <path
          d="M-1,1 l2,-2
           M0,4 l4,-4
           M3,5 l2,-2"
          style={{ stroke: fill, strokeWidth: 1 }}
        />
      </pattern>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={stripes ? "url(#stripes)" : fill}
        strokeWidth={0}
        opacity={index === hoveredBarIndex ? 1 : opacity}
        cursor="pointer"
        clipPath={rounded ? "inset(0px round 4px 4px 0px 0px)" : undefined}
      />
    </>
  );
}

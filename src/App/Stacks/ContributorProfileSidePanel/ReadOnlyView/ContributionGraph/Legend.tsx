import { LegendProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import CodeReviewIcon from "src/assets/icons/CodeReviewCheckIcon";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";

type Props = {
  payload?: ({
    payload?: {
      fill: string;
      opacity: number;
      dataKey: string;
    };
  } & Payload)[];
} & LegendProps;

export default function Legend({ payload = [] }: Props) {
  return (
    <div className="mb-3 flex w-full items-center justify-center gap-6 font-walsheim text-xs font-normal text-greyscale-400">
      {payload.map(payload => (
        <div key={payload.value}>
          <div className="flex flex-row items-center gap-1">
            <Icon color={payload.payload?.fill} opacity={payload.payload?.opacity} size={8} />
            {payload.value}
            {payload.payload?.dataKey === "codeReviewCount" && <CodeReviewIcon />}
            {payload.payload?.dataKey === "issueCount" && <CheckboxCircleLine />}
            {payload.payload?.dataKey === "pullRequestCount" && <GitMergeLine />}
          </div>
        </div>
      ))}
    </div>
  );
}

type IconProps = {
  color?: string;
  opacity?: number;
  secondary?: boolean;
  size: number;
};

export function Icon({ color, opacity, size, secondary }: IconProps) {
  return (
    <div
      className="rounded-sm"
      style={{
        background: secondary
          ? `repeating-linear-gradient(
          -45deg,
          ${color} 0px,
          ${color} 1.4px,
          rgb(0, 0, 0, 0) 1.4px,
          rgb(0, 0, 0, 0) 2.8px
        )`
          : color,
        opacity,
        width: size,
        height: size,
      }}
    />
  );
}

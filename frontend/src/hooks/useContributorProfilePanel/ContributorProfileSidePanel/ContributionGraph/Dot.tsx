import { DotProps } from "recharts";
import { Color } from ".";

type Props = {
  color?: Color;
} & DotProps;

export default function Dot({ cx = 0, cy = 0, color = Color.Primary }: Props) {
  return (
    <svg
      x={cx - 5}
      y={cy - 5}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={5} cy={5} r="3.5" fill={"#F3F0EE"} stroke={color} strokeWidth="3" />
    </svg>
  );
}

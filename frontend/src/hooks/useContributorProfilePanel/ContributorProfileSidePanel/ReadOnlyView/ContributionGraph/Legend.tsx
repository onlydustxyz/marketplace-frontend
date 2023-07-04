import { LegendProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

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
    <div className="mb-3 flex w-full flex-row-reverse items-center justify-center gap-6 font-walsheim text-xs font-normal text-greyscale-400">
      {payload.map(payload => (
        <div key={payload.value}>
          <div className="flex flex-row items-center gap-1">
            <Icon
              secondary={payload.payload?.dataKey === "unpaidCount"}
              color={payload.payload?.fill}
              opacity={payload.payload?.opacity}
              size={8}
            />
            {payload.value}
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

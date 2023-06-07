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
    <div className="flex flex-row-reverse gap-6 mb-3 items-center justify-center w-full text-xs text-greyscale-400 font-walsheim font-normal">
      {payload.map(payload => (
        <div key={payload.value}>
          <div className="flex flex-row gap-1 items-center">
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

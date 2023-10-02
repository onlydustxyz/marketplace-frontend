type Props = {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
};

export default function YTick({ x, y, payload }: Props) {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      dx={2}
      fontSize={10}
      fontFamily="GT Walsheim"
      fill="#92908F"
      textAnchor="start"
      opacity={0.5}
    >
      {payload?.value}
    </text>
  );
}

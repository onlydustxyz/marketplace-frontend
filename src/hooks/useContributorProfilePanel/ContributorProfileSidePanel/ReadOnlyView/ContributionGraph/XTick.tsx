type Props = {
  count: number;
  x?: number;
  y?: number;
  payload?: {
    value: string;
    index: number;
  };
};

export default function XTick({ count, x, y, payload }: Props) {
  return (
    <text
      x={x}
      y={y}
      dy={8}
      fontSize={10}
      fontFamily="GT Walsheim"
      fill={payload?.index === count - 1 ? "#AE00FF" : "#92908F"}
      textAnchor="middle"
    >
      {(payload?.index || 0) % 2 ? "" : payload?.value}
    </text>
  );
}

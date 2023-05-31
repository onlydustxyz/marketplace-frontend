type Props = {
  x?: number;
  y?: number;
  payload?: {
    value: string;
    index: number;
  };
};

export default function Tick({ x, y, payload }: Props) {
  return (
    <text
      x={x}
      y={y}
      dy={8}
      fontSize={10}
      fontFamily="GT Walsheim"
      fill={payload?.index === 8 ? "#AE00FF" : "#92908F"}
      textAnchor={payload?.index === 0 ? "start" : payload?.index === 8 ? "end" : "middle"}
    >
      {(payload?.index || 0) % 2 ? "" : payload?.value}
    </text>
  );
}

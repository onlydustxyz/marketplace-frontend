type Props = {
  x?: number;
  y?: number;
  value?: string;
};

export default function Label({ x, y, value }: Props) {
  return (
    <text x={x} y={y} dy={-10} fontSize={10} fontFamily="GT Walsheim" fill="#C2C0BE" textAnchor="middle">
      {value}
    </text>
  );
}

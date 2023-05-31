type Props = {
  cx?: number;
  cy?: number;
};

export default function Dot({ cx = 0, cy = 0 }: Props) {
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
      <circle cx={5} cy={5} r="3.5" fill="#EFCCFF" stroke="#AE00FF" strokeWidth="3" />
    </svg>
  );
}

import classNames from "classnames";
import { TooltipDirection } from ".";

type Props = {
  direction: TooltipDirection;
};

export default function Tip({ direction }: Props) {
  return (
    <div
      className={classNames("fill-white/10", {
        "rotate-180": [TooltipDirection.Down, TooltipDirection.Right].includes(direction),
      })}
    >
      {isVertical(direction) ? <UpTip /> : <LeftTip />}
    </div>
  );
}

const UpTip = () => (
  <svg width="13" height="6" viewBox="0 0 13 6" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.68248e-07L13 6L0 6L6.5 5.68248e-07Z" />
  </svg>
);

const LeftTip = () => (
  <svg width="6" height="14" viewBox="0 0 6 14" xmlns="http://www.w3.org/2000/svg">
    <path d="M-2.84124e-07 7L6 0.5L6 13.5L-2.84124e-07 7Z" />
  </svg>
);

const isVertical = (direction: TooltipDirection) => [TooltipDirection.Up, TooltipDirection.Down].includes(direction);

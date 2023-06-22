import classNames from "classnames";
import { HeaderColor } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";

type Props = {
  active: boolean;
  color: HeaderColor;
  onClick: (color: HeaderColor) => void;
};

export default function HeaderColorButton({ active, color, onClick }: Props) {
  return (
    <div
      className={classNames("flex h-6 w-6 items-center justify-center rounded-full", {
        "border border-greyscale-50/8": !active,
        "border-2 border-greyscale-50/20": active,
      })}
    >
      <button
        className={classNames("flex h-4 w-4 rounded-full bg-gradient-to-b", {
          "from-cyan-500 to-cyan-100": color === HeaderColor.Cyan,
          "from-fuchsia-500 to-violet-950": color === HeaderColor.Magenta,
          "from-amber-600 to-yellow-200": color === HeaderColor.Yellow,
          "from-midBlue-500 to-midBlue-200": color === HeaderColor.Blue,
        })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onClick(color);
        }}
        disabled={active}
      >
        <div
          className={classNames("flex h-4 w-4 rounded-full", {
            "bg-black/40 hover:bg-transparent": !active,
            "bg-transparent": active,
          })}
        ></div>
      </button>
    </div>
  );
}

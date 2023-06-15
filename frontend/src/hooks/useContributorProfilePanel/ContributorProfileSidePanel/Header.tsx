import classNames from "classnames";
import { Maybe } from "src/__generated/graphql";

export enum HeaderColor {
  Blue = "blue",
  Cyan = "cyan",
  Magenta = "magenta",
  Yellow = "yellow",
}

type Props = {
  color: HeaderColor;
  avatarUrl: Maybe<string>;
};

export default function Header({ color, avatarUrl }: Props) {
  return (
    <div className="z-10">
      <div
        className={classNames("h-24 w-full bg-cover shrink-0", {
          "bg-profile-blue": color === HeaderColor.Blue,
          "bg-profile-cyan": color === HeaderColor.Cyan,
          "bg-profile-magenta": color === HeaderColor.Magenta,
          "bg-profile-yellow": color === HeaderColor.Yellow,
        })}
      />

      {avatarUrl && (
        <img src={avatarUrl} className="rounded-full w-24 h-24 ml-8 -mt-12 outline outline-4 outline-greyscale-50/12" />
      )}
    </div>
  );
}

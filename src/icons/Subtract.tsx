import classNames from "classnames";

export enum Size {
  Medium = "Medium",
}

interface Props {
  size?: Size;
}

export default function Subtract({ size = Size.Medium }: Props) {
  return <i role="subtract" className={classNames("ri-subtract-line", { "text-base": size === Size.Medium })} />;
}

import { cn } from "src/utils/cn";

export enum Size {
  Medium = "Medium",
}

interface Props {
  size?: Size;
}

export default function Subtract({ size = Size.Medium }: Props) {
  return <i role="subtract" className={cn("ri-subtract-line", { "text-base": size === Size.Medium })} />;
}

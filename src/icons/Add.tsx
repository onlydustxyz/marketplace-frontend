import { cn } from "src/utils/cn";

export enum Size {
  Medium = "Medium",
}

interface Props {
  size?: Size;
}

export default function Add({ size = Size.Medium }: Props) {
  return <i role="add" className={cn("ri-add-line", { "text-base": size === Size.Medium })} />;
}

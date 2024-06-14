import { TagCore } from "../tag.core";
import { TTagProps } from "../tag.types";
import { ElementType } from "react";

export function Tag<C extends ElementType = "div">({ ...props }: TTagProps<C>) {
  return <TagCore {...props} classNames={{}} />;
}

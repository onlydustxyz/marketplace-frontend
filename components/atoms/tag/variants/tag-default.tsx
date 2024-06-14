import { ElementType } from "react";

import { TagCore } from "../tag.core";
import { TTagCoreProps } from "../tag.types";

export function Tag<C extends ElementType = "div">({ ...props }: TTagCoreProps<C>) {
  return <TagCore {...props} classNames={{}} />;
}

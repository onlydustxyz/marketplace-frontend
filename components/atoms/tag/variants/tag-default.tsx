import { ElementType } from "react";

import { TagCore } from "../tag.core";
import { TTagProps } from "../tag.types";

export function Tag<C extends ElementType = "span">(props: TTagProps<C>) {
  return <TagCore {...props} />;
}

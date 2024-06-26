import { ElementType } from "react";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagCore } from "../tag.core";
import { TagPort } from "../tag.types";

export function Tag<C extends ElementType = "span">(props: TagPort<C>) {
  return <TagCore Adapter={TagDefaultAdapter} {...props} />;
}

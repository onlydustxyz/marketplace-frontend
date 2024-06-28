import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagPort } from "../tag.types";

export function Tag<C extends ElementType = "span">(props: TagPort<C>) {
  return withComponentAdapter<TagPort<C>>(TagDefaultAdapter)(props);
}

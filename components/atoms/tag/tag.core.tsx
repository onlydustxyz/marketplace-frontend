import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { TagPort } from "./tag.types";

export function TagCore<C extends ElementType = "div">({ Adapter, ...props }: PropsWithAdapter<TagPort<C>>) {
  return <Adapter {...props} />;
}

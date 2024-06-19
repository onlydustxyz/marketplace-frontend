import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { DrawerPort } from "./drawer.types";

export function DrawerCore<C extends ElementType = "div">({ Adapter, ...props }: PropsWithAdapter<DrawerPort<C>>) {
  return <Adapter {...props} />;
}

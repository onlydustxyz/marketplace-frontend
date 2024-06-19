import { ElementType } from "react";

import { DrawerNextUiAdapter } from "components/molecules/drawer/adapters/next-ui/next-ui.adapter";

import { DrawerCore } from "../drawer.core";
import { DrawerPort } from "../drawer.types";

export function Drawer<C extends ElementType = "div">({ ...props }: DrawerPort<C>) {
  return (
    <DrawerCore {...props} Adapter={DrawerNextUiAdapter}>
      {props.children}
    </DrawerCore>
  );
}

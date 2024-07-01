import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { DrawerNextUiAdapter } from "components/molecules/drawer/adapters/next-ui/next-ui.adapter";

import { DrawerPort } from "../drawer.types";

export function Drawer<C extends ElementType = "div">(props: DrawerPort<C>) {
  return withComponentAdapter<DrawerPort<C>>(DrawerNextUiAdapter)(props);
}

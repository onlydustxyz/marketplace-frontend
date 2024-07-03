import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { withClientOnly } from "components/layout/client-only/client-only";
import { DrawerNextUiAdapter } from "components/molecules/drawer/adapters/next-ui/next-ui.adapter";

import { DrawerPort } from "../drawer.types";

function DrawerClientOnly<C extends ElementType = "div">(props: DrawerPort<C>) {
  return withComponentAdapter<DrawerPort<C>>(DrawerNextUiAdapter)(props);
}

export const Drawer = withClientOnly(DrawerClientOnly);

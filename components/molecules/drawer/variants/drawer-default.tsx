import { DrawerCore } from "../drawer.core";
import { TDrawerProps } from "../drawer.types";
import { ElementType } from "react";

export function Drawer<C extends ElementType = "div">({
  ...props
}: TDrawerProps<C>) {
  return <DrawerCore {...props} classNames={{}} />;
}

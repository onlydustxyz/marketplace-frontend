import { ElementType } from "react";

import { Icon } from "components/layout/icon/icon";

import { TagCore } from "../tag.core";
import { TTagCoreProps, TTagIconProps } from "../tag.types";

export function TagIcon<C extends ElementType = "div">({ icon, variant: _, ...props }: TTagIconProps<C>) {
  return <TagCore {...props} classNames={{}} />;
}

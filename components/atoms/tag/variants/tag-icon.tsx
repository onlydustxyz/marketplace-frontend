import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

import { TagCore } from "../tag.core";
import { TTagIconProps } from "../tag.types";

export function TagIcon<C extends ElementType = "span">({ icon, ...props }: TTagIconProps<C>) {
  return <TagCore {...props} startContent={<Icon {...icon} className={cn("text-inherit", icon.className)} />} />;
}

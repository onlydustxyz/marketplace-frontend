import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { Icon } from "components/layout/icon/icon";

import { TagDefaultAdapter } from "../adapters/default/default.adapter";
import { TagIconPort } from "../tag.types";

export function TagIcon<C extends ElementType = "span">({ icon, ...props }: TagIconPort<C>) {
  return withComponentAdapter<Omit<TagIconPort<C>, "icon">>(TagDefaultAdapter)({
    ...props,
    startContent: <Icon {...icon} className={cn("text-inherit", icon.className)} />,
  });
}

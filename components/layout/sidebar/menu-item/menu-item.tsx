import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";

export function MenuItem({ label, endIcon, ...restProps }: TMenuItem.Props) {
  return (
    <BaseLink
      className={cn(
        "rounded-xl px-4 py-2.5 text-base text-neutral-400 data-[active=true]:bg-white/8 data-[active=true]:text-white",
        {
          "flex flex-row items-center justify-between gap-1": !!endIcon,
        }
      )}
      {...restProps}
    >
      <span>{label}</span>
      {endIcon}
    </BaseLink>
  );
}

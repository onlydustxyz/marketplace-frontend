import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";

export function MenuItem({ label, endIcon, startIcon, ...restProps }: TMenuItem.Props) {
  return (
    <BaseLink
      className={cn(
        "od-text-body-m rounded-xl px-4 py-2.5 text-greyscale-600 transition-all data-[active=true]:bg-white/8 data-[active=true]:text-white hover:bg-white/5",
        {
          "flex flex-row items-center justify-between gap-1": !!endIcon,
        }
      )}
      {...restProps}
    >
      <span
        className={cn({
          "flex items-center justify-start gap-1": !!startIcon,
        })}
      >
        {startIcon ? <span>{startIcon}</span> : null} <span>{label}</span>
      </span>
      {endIcon}
    </BaseLink>
  );
}

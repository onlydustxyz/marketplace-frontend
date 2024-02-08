import { NavLink } from "react-router-dom";

import { cn } from "src/utils/cn";

import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";

export function MenuItem({ href, label, onClick, isActive, endIcon }: TMenuItem.Props) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={cn("rounded-xl px-4 py-2.5 text-base", {
        "bg-white/8 text-white": isActive,
        "text-neutral-400": !isActive,
        "flex flex-row items-center justify-between gap-1": !!endIcon,
      })}
    >
      <span>{label}</span>
      {endIcon}
    </NavLink>
  );
}

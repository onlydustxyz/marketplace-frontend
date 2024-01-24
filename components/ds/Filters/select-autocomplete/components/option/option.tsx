import { TOption } from "./option.types";
import { cn } from "src/utils/cn";
import { Avatar } from "src/components/New/Avatar";
import { IMAGES } from "src/assets/img";
import CheckLine from "src/icons/CheckLine";
import React from "react";

export function Option({ active, selected, item, type }: TOption.Props) {
  return (
    <div
      className={cn("flex cursor-pointer items-center gap-3 rounded-md px-2 py-2", {
        "bg-card-background-heavy": active || selected,
      })}
    >
      {typeof item.image !== "undefined" ? (
        <Avatar
          src={item?.image ?? IMAGES.logo.space}
          alt="Avatar image"
          shape={type === "user" ? "circle" : "square"}
        />
      ) : null}
      <span className="flex-1 truncate font-walsheim text-sm text-greyscale-50">{item.label}</span>
      {selected ? <CheckLine className="text-xl leading-none text-greyscale-50" /> : null}
    </div>
  );
}

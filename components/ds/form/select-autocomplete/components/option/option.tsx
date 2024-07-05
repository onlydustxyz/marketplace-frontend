import { IMAGES } from "src/assets/img";
import { Avatar } from "src/components/New/Avatar";
import CheckLine from "src/icons/CheckLine";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TOption } from "./option.types";

export function Option({ active, selected, item, type }: TOption.Props) {
  return (
    <div
      className={cn("flex cursor-pointer items-center gap-3 rounded-md px-2 py-2", {
        "bg-card-background-heavy": active || selected,
      })}
    >
      {typeof item.iconSlug !== "undefined" ? <Icon remixName={item.iconSlug as RemixIconsName} /> : null}
      {typeof item.image !== "undefined" ? (
        <Avatar src={item?.image ?? IMAGES.logo.space} alt={item.value || ""} shape={type} />
      ) : null}
      <span className="flex-1 truncate font-walsheim text-sm text-greyscale-50">{item.label}</span>
      {selected ? <CheckLine className="text-xl leading-none text-greyscale-50" /> : null}
    </div>
  );
}

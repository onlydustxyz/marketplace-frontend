import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TCardItem } from "./card-item.types";

export function CardItem({ border = true, icon, label, children, show }: TCardItem.Props) {
  if (!children || !show) return null;

  return (
    <div
      className={cn("flex w-full flex-col items-start justify-start gap-3 p-5", {
        "border-b border-b-card-border-light": border,
      })}
    >
      <div className="flex w-full items-center justify-start gap-1">
        <Icon {...icon} className="text-spaceBlue-200" />
        <Typography variant={"special-label"} className="uppercase text-spaceBlue-200" translate={{ token: label }} />
      </div>
      <Typography variant={"title-m"} as="div">
        {children}
      </Typography>
    </div>
  );
}

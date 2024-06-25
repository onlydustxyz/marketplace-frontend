import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TCardItem } from "./card-item.types";

export function CardItem({ icon, label, children, show }: TCardItem.Props) {
  if (!children || !show) return null;

  return (
    <div className={"flex w-full flex-col items-start justify-start gap-3 overflow-hidden p-5"}>
      <div className="flex w-full items-center justify-start gap-1">
        <Icon {...icon} className="text-spaceBlue-200" />
        <Typography variant={"special-label"} className="uppercase text-spaceBlue-200" translate={{ token: label }} />
      </div>
      <Typography variant={"title-m"} as="div" className="max-w-full overflow-hidden text-ellipsis">
        {children}
      </Typography>
    </div>
  );
}

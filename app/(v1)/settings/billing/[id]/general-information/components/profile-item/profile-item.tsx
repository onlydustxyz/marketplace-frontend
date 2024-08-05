import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TProfileItem } from "./profile-item.types";

export function ProfileItem({ children, label, className }: TProfileItem.Props) {
  return (
    <Flex direction="col" justifyContent="start" alignItems="start" className="gap-2">
      <Typography variant="special-label" translate={{ token: label }} className="text-spaceBlue-200" />
      <Typography variant="body-s" className={cn("line max-w-[80%] uppercase leading-5 text-greyscale-50", className)}>
        {children || "-"}
      </Typography>
    </Flex>
  );
}

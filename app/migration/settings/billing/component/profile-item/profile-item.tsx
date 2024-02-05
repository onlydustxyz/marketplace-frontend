import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TProfileItem } from "./profile-item.types";

export function ProfileItem({ children, label }: TProfileItem.Props) {
  return (
    <Flex direction="col" justifyContent="start" alignItems="start" className="gap-2">
      <Typography variant="special-label" translate={{ token: label }} className="text-spaceBlue-200" />
      <Typography variant="body-s" as={"p"}>
        {children || "-"}
      </Typography>
    </Flex>
  );
}

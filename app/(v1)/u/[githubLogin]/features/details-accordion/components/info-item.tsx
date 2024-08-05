import { TDetailsAccordion } from "app/(v1)/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function InfoItem({ icon, count, labelToken }: TDetailsAccordion.ItemInfoProps) {
  return (
    <Flex alignItems="center" className="gap-1">
      <Icon remixName={icon} />
      <Flex className="gap-0.5">
        <Typography variant="body-s-bold">{count}</Typography>
        <Typography variant="body-xs" translate={{ token: labelToken }} className="text-spaceBlue-100" />
      </Flex>
    </Flex>
  );
}

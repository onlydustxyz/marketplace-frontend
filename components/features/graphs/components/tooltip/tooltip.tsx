import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTooltip } from "./tooltip.types";

export function Tooltip({ data }: TTooltip.Props) {
  return (
    <Flex direction="col" className="gap-2 rounded-medium bg-default-50 px-3 py-2 shadow-small">
      <Flex alignItems="center" className="gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: data.color,
          }}
        />

        <Typography variant="body-s" className="text-default-900">
          {data.label}
        </Typography>
      </Flex>

      <Flex alignItems="center" className="gap-0.5">
        <Typography variant="body-s-bold" className="text-default-900">
          TODO
        </Typography>

        <Typography
          variant="body-xs"
          translate={{
            token: "pages.users.single.totalEarned.usd",
          }}
          className="text-default-500"
        />
      </Flex>
    </Flex>
  );
}

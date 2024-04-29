import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TCustomTooltip } from "./custom-tooltip.types";

export function CustomTooltip({ active, payload, children }: TCustomTooltip.Props) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <Flex direction="col" className="gap-3 rounded-lg bg-greyscale-800 px-3 py-2 shadow-md">
      <Flex alignItems="center" className="gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: payload[0].payload.fill,
          }}
        />

        <Typography variant="body-s">{payload[0].name}</Typography>
      </Flex>

      {children}
    </Flex>
  );
}

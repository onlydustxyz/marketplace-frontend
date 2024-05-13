import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TTooltip } from "./tooltip.types";

export function Tooltip({ data, renderTooltip }: TTooltip.Props) {
  return (
    <Flex direction="col" className="gap-2 rounded-lg bg-greyscale-800 px-3 py-2 shadow-md">
      <Flex alignItems="center" className="gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: data.color,
          }}
        />

        <Typography variant="body-s">{data.label}</Typography>
      </Flex>

      {renderTooltip ? renderTooltip(data) : <Typography variant="body-s-bold">{data.value}</Typography>}
    </Flex>
  );
}

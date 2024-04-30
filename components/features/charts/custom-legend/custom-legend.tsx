import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TCustomLegend } from "./custom-legend.types";

export function CustomLegend({ payload }: TCustomLegend.Props) {
  if (!payload?.length) {
    return null;
  }

  return (
    <Flex as="ul" direction="col" className="gap-2">
      {payload.map((entry, index) => (
        <Flex key={`item-${index}`} as="li" alignItems="center" className="gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: entry.color,
            }}
          />

          <Typography variant="body-m">{entry.value}</Typography>
        </Flex>
      ))}
    </Flex>
  );
}

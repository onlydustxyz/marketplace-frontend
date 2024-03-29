import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TIndividualProgression } from "./individual-progression.types";

export function IndividualProgression({ amount, limit }: TIndividualProgression.Props) {
  if (!amount || !limit) {
    return null;
  }

  return (
    <Flex alignItems="center" className="gap-2">
      <Typography
        variant="body-s"
        translate={{
          token: "v2.pages.settings.billing.header.invidivualProgression",
          params: {
            amountLeft: (limit - amount).toFixed(2).toString(),
          },
        }}
        className="whitespace-nowrap"
      />

      <ProgressBar
        value={amount}
        maxValue={limit}
        color="spacePurple"
        classNames={{
          base: "w-40",
        }}
      />
    </Flex>
  );
}

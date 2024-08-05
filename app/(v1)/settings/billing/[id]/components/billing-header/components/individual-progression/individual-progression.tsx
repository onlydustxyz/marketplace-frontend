import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TIndividualProgression } from "./individual-progression.types";

export function IndividualProgression({ amount, limit }: TIndividualProgression.Props) {
  if (!amount || !limit) {
    return null;
  }

  const amountLeft = (limit - amount).toFixed(2).toString();
  const isLimitReached = amount >= limit;

  const renderValue = () => {
    if (isLimitReached) {
      return (
        <Typography
          variant="body-s"
          translate={{ token: "v2.pages.settings.billing.header.limitReached" }}
          className="whitespace-nowrap"
        />
      );
    }

    return (
      <Typography
        variant="body-s"
        translate={{
          token: "v2.pages.settings.billing.header.individualProgression",
          params: {
            amountLeft,
          },
        }}
        className="whitespace-nowrap"
      />
    );
  };

  return (
    <Flex alignItems="center" className="gap-2">
      <ProgressBar value={amount} maxValue={limit} color={isLimitReached ? "orange" : "spacePurple"} />
      {renderValue()}
    </Flex>
  );
}

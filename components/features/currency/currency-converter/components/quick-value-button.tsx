import React from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { TQuickValueButton } from "components/features/currency/currency-converter/components/quick-value-button.types";
import { Translate } from "components/layout/translate/translate";

export function QuickValueButton({ value, currentUsdValue, onSetUsdValue }: TQuickValueButton.Props) {
  return (
    <Button
      variant="secondary"
      onClick={() => onSetUsdValue(value)}
      size="xs"
      className={cn("od-text-body-xs w-full border border-greyscale-50/8", {
        "border-spacePurple-500": parseFloat(currentUsdValue) === parseFloat(value),
      })}
    >
      <Translate token={`v2.features.currencyConverter.quickValues.${value}Usd`} />
    </Button>
  );
}

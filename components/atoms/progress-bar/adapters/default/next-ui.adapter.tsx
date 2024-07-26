import { Progress } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { ProgressBarPort } from "../../progress-bar.types";
import { ProgressBarNextUiVariants } from "./next-ui.variants";

export function ProgressBarNextUiAdapter({ classNames, min = 0, max = 100, value, color }: ProgressBarPort) {
  const slots = ProgressBarNextUiVariants({ color });

  return (
    <Progress
      classNames={{
        base: cn(slots.base(), classNames?.base),
        track: cn(slots.track(), classNames?.track),
        indicator: cn(slots.indicator(), classNames?.indicator),
      }}
      minValue={min}
      maxValue={max}
      value={value}
    />
  );
}

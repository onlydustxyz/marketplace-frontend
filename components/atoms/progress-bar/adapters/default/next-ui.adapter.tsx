import { Progress } from "@nextui-org/react";
import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ProgressBarPort } from "../../progress-bar.types";
import { ProgressBarNextUiVariants } from "./next-ui.variants";

export function ProgressBarNextUiAdapter<C extends ElementType = "div">({
  classNames,
  htmlProps,
  minValue = 0,
  maxValue = 100,
  value,
}: ProgressBarPort<C>) {
  const slots = ProgressBarNextUiVariants();

  return (
    <Progress
      {...htmlProps}
      className={cn(slots.base(), classNames?.base)}
      classNames={{
        track: cn(slots.track(), classNames?.track),
        indicator: cn(slots.indicator(), classNames?.indicator),
      }}
      minValue={minValue}
      maxValue={maxValue}
      value={value}
    />
  );
}

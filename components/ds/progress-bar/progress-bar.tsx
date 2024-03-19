import { Progress } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { progressbarVariants } from "components/ds/progress-bar/progress-bar.variants";

import { TProgressBar } from "./progress-bar.types";

export function ProgressBar({ classNames, value, maxValue, ...props }: TProgressBar.Props) {
  const slots = progressbarVariants({ ...props });
  return (
    <div className="w-full">
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: cn(slots.base(), classNames?.base),
          track: cn(slots.track(), classNames?.track),
          indicator: cn(slots.indicator(), classNames?.indicator),
          label: cn(slots.label(), classNames?.label),
          value: cn(slots.value(), classNames?.value),
        }}
        value={value}
        maxValue={maxValue}
        showValueLabel={false}
      />
    </div>
  );
}

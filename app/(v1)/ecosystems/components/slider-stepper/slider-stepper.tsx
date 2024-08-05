import { TCarouselStepper } from "app/(v1)/ecosystems/components/slider-stepper/slider-stepper.types";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

export function SliderStepper({ prevProps, nextProps, className }: TCarouselStepper.Props) {
  return (
    <div className={cn("flex gap-1", className)}>
      <Button variant={"secondary"} size={"s"} iconOnly {...prevProps}>
        <Icon remixName={"ri-arrow-left-s-line"} size={16} />
      </Button>

      <Button variant={"secondary"} size={"s"} iconOnly {...nextProps}>
        <Icon remixName={"ri-arrow-right-s-line"} size={16} />
      </Button>
    </div>
  );
}

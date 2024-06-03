import { TCarouselStepper } from "app/ecosystems/components/slider-stepper/slider-stepper.types";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

export function SliderStepper({ prevProps, nextProps }: TCarouselStepper.Props) {
  return (
    <div className={"flex gap-1"}>
      <Button variant={"secondary"} size={"s"} iconOnly {...prevProps}>
        <Icon remixName={"ri-arrow-left-s-line"} size={16} />
      </Button>

      <Button variant={"secondary"} size={"s"} iconOnly {...nextProps}>
        <Icon remixName={"ri-arrow-right-s-line"} size={16} />
      </Button>
    </div>
  );
}

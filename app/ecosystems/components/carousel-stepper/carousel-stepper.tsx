import { TCarouselStepper } from "app/ecosystems/components/carousel-stepper/carousel-stepper.types";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

export function CarouselStepper({ prevProps, nextProps }: TCarouselStepper.Props) {
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

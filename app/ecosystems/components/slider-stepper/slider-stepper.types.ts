import { ComponentProps } from "react";

import { Button } from "components/ds/button/button";

export namespace TCarouselStepper {
  type ButtonProps = Omit<ComponentProps<typeof Button>, "variant" | "size" | "iconOnly">;
  export interface Props {
    prevProps: ButtonProps;
    className?: string;
    nextProps: ButtonProps;
  }
}

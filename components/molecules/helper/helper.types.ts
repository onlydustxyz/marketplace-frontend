import { ComponentProps, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";

import { Typo } from "../../atoms/typo/variants/typo-default";

interface Variants {
  container:
    | "brand-1"
    | "brand-2"
    | "brand-3"
    | "brand-4"
    | "container-1"
    | "container-2"
    | "container-3"
    | "container-4"
    | "danger";
  size: "m";
  layout: "horizontal" | "vertical";
}

interface ClassNames {
  base: string;
  endContainer: string;
}

export interface HelperPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatar?: ComponentProps<typeof Avatar>;
  title?: ComponentProps<typeof Typo>;
  text?: ComponentProps<typeof Typo>;
  startButton?: ComponentProps<typeof Button>;
  endButton?: ComponentProps<typeof Button>;
  endContent?: ReactNode;
  startContent?: ReactNode;
}

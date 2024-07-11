import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { ButtonPort } from "components/atoms/button/button.types";
import { TagPort } from "components/atoms/tag";
import { TIcon } from "components/layout/icon/icon.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export type CardEventDisplay = "planned" | "terminated" | "highlight";

export interface CardEventPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: ReactNode;
  titleIcon?: TIcon.Props;
  text?: ReactNode;
  tag?: TagPort<"span">;
  display?: CardEventDisplay;
  primaryAction?: ButtonPort<"button">;
  secondaryAction?: ButtonPort<"button">;
}

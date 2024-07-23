import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { ButtonPort } from "components/atoms/button/button.types";
import { TagPort } from "components/atoms/tag";
import { TIcon } from "components/layout/icon/icon.types";

interface ClassNames {
  base: string;
}

export type CardEventStatus = "planned" | "terminated" | "highlight";

export interface CardEventPort<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: ReactNode;
  titleIconProps?: TIcon.Props;
  text?: ReactNode;
  tagProps?: TagPort<"span">;
  status?: CardEventStatus;
  primaryActionProps?: ButtonPort<"a">;
  secondaryActionProps?: ButtonPort<"a">;
}

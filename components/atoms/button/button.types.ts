import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

import { ButtonCoreVariants } from "./button.variants";

type Variants = VariantProps<typeof ButtonCoreVariants>;
type classNames = Partial<typeof ButtonCoreVariants["slots"]>;

export interface TButtonProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: Omit<ComponentPropsWithoutRef<C>, "type">;
  classNames?: classNames;
  translate?: TTranslate.Props;
  as?: C;
  startIcon?: TIcon.Props;
  endIcon?: TIcon.Props;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
  canInteract?: boolean;
}

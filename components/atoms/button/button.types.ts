import { ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

import { ButtonCoreVariants } from "./button.variants";

type Variants = VariantProps<typeof ButtonCoreVariants>;
type classNames = Partial<typeof ButtonCoreVariants["slots"]>;

export type TButtonProps<T extends ElementType = "button"> = AsProps<T> &
  Variants &
  PropsWithChildren & {
    classNames?: classNames;
    as?: T;
    startIcon?: TIcon.Props;
    endIcon?: TIcon.Props;
    startContent?: ReactNode;
    endContent?: ReactNode;
    translate?: TTranslate.Props;
    isLoading?: boolean;
  };

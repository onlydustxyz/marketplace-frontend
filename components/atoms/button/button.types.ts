import { ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TIcon } from "components/layout/icon/icon.types";

import { ButtonCoreVariants } from "./button.variants";

type Variants = VariantProps<typeof ButtonCoreVariants>;
type classNames = Partial<typeof ButtonCoreVariants["slots"]>;

export type TButtonProps<C extends ElementType> = AsProps<C> &
  Variants &
  PropsWithChildren & {
    classNames?: classNames;
    as?: C;
    startIcon?: TIcon.Props;
    endIcon?: TIcon.Props;
    startContent?: ReactNode;
    endContent?: ReactNode;
  };

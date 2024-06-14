import { ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TIcon } from "components/layout/icon/icon.types";

import { TagCoreVariants } from "./tag.variants";

type Variants = VariantProps<typeof TagCoreVariants>;
type classNames = Partial<typeof TagCoreVariants["slots"]>;

export type TTagProps<C extends ElementType> = AsProps<C> &
  Variants & {
    classNames?: classNames;
    as?: C;
    startIcon?: TIcon.Props;
    startContent?: ReactNode;
  };

import { ComponentPropsWithoutRef, ElementType } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { ZdqCoreVariants } from "./zdq.variants";

export namespace TZdqCore {
  export type Variants = VariantProps<typeof ZdqCoreVariants>;
  export type classNames = Partial<typeof ZdqCoreVariants["slots"]>;

  export type Props<T extends ElementType = "div"> = AsProps<T> &
    Variants & {
      classNames?: classNames;
      as?: T;
    };
}

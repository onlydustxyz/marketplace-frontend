import { ElementType } from "react";
import { VariantProps } from "tailwind-variants";

import { PaginationCoreVariants } from "./pagination.variants";

type Variants = VariantProps<typeof PaginationCoreVariants>;
type classNames = Partial<typeof PaginationCoreVariants["slots"]>;

export interface TPaginationProps<C extends ElementType> extends Variants {
  classNames?: classNames;
  as?: C;
  disablePrev?: boolean;
  disableNext?: boolean;
  total?: number;
  current?: number;
  infinite?: boolean;
  onNext?(): void;
  onPrev?(): void;
}

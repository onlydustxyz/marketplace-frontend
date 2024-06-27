import { ElementType } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface PaginationPort<C extends ElementType> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  as?: C;
  disablePrev?: boolean;
  disableNext?: boolean;
  total?: number;
  current?: number;
  isInfinite?: boolean;
  onNext?(): void;
  onPrev?(): void;
}

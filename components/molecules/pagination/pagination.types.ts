import { ElementType } from "react";

import { TButtonProps } from "components/atoms/button/button.types";

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
  infinite?: boolean;
  onNext?(): void;
  onPrev?(): void;
  buttonProps?: Omit<TButtonProps<"button">, "htmlProps">;
}

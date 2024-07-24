import { PropsWithChildren } from "react";

interface Variants {
  isDisabled: boolean;
}

interface ClassNames {
  base: string;
  wrapper: string;
  thumb: string;
  label: string;
  startContent: string;
  endContent: string;
  thumbIcon: string;
}

export interface SwitchPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  onChange?: (isActive: boolean) => void;
  value?: boolean;
  isDisabled?: boolean;
  mixed?: boolean;
}

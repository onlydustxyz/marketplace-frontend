import { ReactNode } from "react";

interface ClassNames {
  base: string;
  wrapper: string;
  thumb: string;
  label: string;
  startContent: string;
  endContent: string;
  thumbIcon: string;
}

export interface SwitchPort {
  classNames?: Partial<ClassNames>;
  onChange: (isActive: boolean) => void;
  isActive: boolean;
  isDisabled?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

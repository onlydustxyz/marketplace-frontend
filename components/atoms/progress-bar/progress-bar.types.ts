import { ComponentPropsWithoutRef, ElementType } from "react";

interface Variants {}

interface ClassNames {
  base: string;
  track: string;
  indicator: string;
}

export interface ProgressBarPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  minValue?: number;
  maxValue?: number;
  value: number;
}

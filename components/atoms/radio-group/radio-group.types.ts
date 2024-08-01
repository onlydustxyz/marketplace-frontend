import { ComponentPropsWithoutRef, ElementType } from "react";

export interface Variants {
  color: "white" | "black";
  isDisabled?: boolean;
  mixed?: boolean;
}

interface ClassNames {
  base: string;
  item: string;
  indicator: string;
  indicatorIcon: string;
}

export interface RadioPort<V extends string | null, C extends ElementType> extends Partial<Variants> {
  as?: C;
  classNames?: Partial<ClassNames>;
  componentProps?: ComponentPropsWithoutRef<C>;
  value: V;
}

export interface RadioGroupPort<V extends string, C extends ElementType> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  componentProps?: ComponentPropsWithoutRef<C>;
  value: V;
  as?: C;
  onChange?: (value: V) => void;
  items: RadioPort<V, C>[];
}

import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

interface Variants {
  size: "s" | "m" | "l" | "xl";
  isLoading: boolean;
  isDisabled: boolean;
  hideText: boolean;
}

interface ClassNames {
  base: string;
  content: string;
  startIcon: string;
  endIcon: string;
  label: string;
  loaderContainer: string;
  spinnerCircle: string;
}

export interface ButtonPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: Omit<ComponentPropsWithoutRef<C>, "type">;
  classNames?: Partial<ClassNames>;
  translate?: TTranslate.Props;
  as?: C;
  startIcon?: TIcon.Props;
  endIcon?: TIcon.Props;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
  canInteract?: boolean;
}

export type ButtonDefaultPort<C extends ElementType> = ButtonPort<C> & {
  variant?: "primary" | "danger" | "secondary-light" | "secondary-dark";
};

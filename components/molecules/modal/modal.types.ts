import { ComponentProps, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";

interface Variants {
  size: "m" | "l";
  container: "1" | "2" | "3" | "4";
}

interface ClassNames {
  modal: string;
  body: string;
  backdrop: string;
  header: string;
  footer: string;
}

export interface ModalPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  as?: C;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  classNames?: Partial<ClassNames>;
  titleProps?: Partial<ComponentProps<typeof Typo>>;
  closeButtonProps?: ComponentProps<typeof Button>;
  footer?: {
    startContent?: ReactNode;
    endContent?: ReactNode;
  };
  canDismiss?: boolean;
}

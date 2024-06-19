import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";

import { ModalCoreVariants } from "./modal.variants";

type Variants = VariantProps<typeof ModalCoreVariants>;
type classNames = Partial<typeof ModalCoreVariants["slots"]>;

export interface ModalPort extends Variants, PropsWithChildren {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  classNames?: classNames;
  titleProps?: Partial<ComponentProps<typeof Typo>>;
  closeButtonProps?: ComponentProps<typeof Button>;
  footer?: {
    startContent?: ReactNode;
    endContent?: ReactNode;
  };
  canDismiss?: boolean;
}

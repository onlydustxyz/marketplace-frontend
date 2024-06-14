import { ModalProps } from "@nextui-org/modal";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";

import { ModalCoreVariants } from "./modal.variants";

type Variants = VariantProps<typeof ModalCoreVariants>;
type classNames = Partial<typeof ModalCoreVariants["slots"]>;

export interface TModalProps
  extends Variants,
    PropsWithChildren,
    Pick<ModalProps, "isOpen" | "onOpenChange" | "isDismissable"> {
  classNames?: classNames;
  titleProps: Partial<ComponentProps<typeof Typo>>;
  closeButtonProps?: ComponentProps<typeof Button>;
  footerStartContent?: ReactNode;
  footerEndContent?: ReactNode;
}

import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { ModalNextUiAdapter } from "components/molecules/modal/adapters/next-ui/next-ui.adapter";

import { ModalPort } from "../modal.types";

export function Modal<C extends ElementType = "div">({ titleProps, closeButtonProps, ...props }: ModalPort<C>) {
  const { modal, footer, ...restClassNames } = props.classNames ?? {};

  return withComponentAdapter<ModalPort<C>>(ModalNextUiAdapter)({
    ...props,
    classNames: {
      modal: cn("border border-container-stroke-separator", modal),
      footer: cn("border-t border-container-stroke-separator", footer),
      ...restClassNames,
    },
    titleProps: {
      variant: "brand",
      size: "xl",
      as: "h6",
      ...titleProps,
    },
    closeButtonProps: {
      variant: "secondary-light",
      size: "l",
      ...closeButtonProps,
    },
  });
}

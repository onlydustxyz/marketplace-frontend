import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { ModalNextUiAdapter } from "components/molecules/modal/adapters/next-ui/next-ui.adapter";

import { ModalPort } from "../modal.types";

export function Modal<C extends ElementType = "div">({ titleProps, closeButtonProps, ...props }: ModalPort<C>) {
  return withComponentAdapter<ModalPort<C>>(ModalNextUiAdapter)({
    ...props,
    classNames: {
      modal: "border border-container-stroke-separator",
      footer: "border-t border-container-stroke-separator",
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

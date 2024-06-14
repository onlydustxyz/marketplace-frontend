import { ModalCore } from "../modal.core";
import { TModalProps } from "../modal.types";

export function Modal({ titleProps, closeButtonProps, ...props }: TModalProps) {
  return (
    <ModalCore
      {...props}
      classNames={{
        base: "bg-container-2 border border-container-stroke-separator",
        footer: "border-t border-container-stroke-separator",
      }}
      titleProps={{
        variant: "branding",
        size: "xl",
        as: "h6",
        ...titleProps,
      }}
      closeButtonProps={{
        variant: "secondary-light",
        size: "l",
        ...closeButtonProps,
      }}
    />
  );
}

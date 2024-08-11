import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { ModalNextUiVariants } from "components/molecules/modal/adapters/next-ui/next-ui.variants";
import { ModalPort } from "components/molecules/modal/modal.types";

export function ModalNextUiAdapter<C extends ElementType = "div">({
  htmlProps,
  as,
  children,
  isOpen,
  onOpenChange,
  classNames,
  titleProps,
  closeButtonProps,
  footer,
  canDismiss = true,
  hideCloseButton,
  size,
  container,
}: ModalPort<C>) {
  const Inner = as || "div";
  const slots = ModalNextUiVariants({ size, container });
  const hasTitle = Boolean(titleProps?.translate || titleProps?.children);

  return (
    <Modal
      classNames={{
        base: cn(slots.modal(), classNames?.modal),
        body: cn(slots.body(), classNames?.body),
        backdrop: cn(slots.backdrop(), classNames?.backdrop),
        header: cn(slots.header(), classNames?.header),
        footer: cn(slots.footer(), classNames?.footer),
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={canDismiss}
      isKeyboardDismissDisabled={!canDismiss}
      hideCloseButton
    >
      <ModalContent>
        {onClose => (
          <>
            <Inner {...(htmlProps ?? {})}>
              <ModalHeader className={"empty:hidden"}>
                {hasTitle ? <Typo {...titleProps} classNames={{ base: "truncate" }} /> : null}
                {!hideCloseButton ? (
                  <Button {...closeButtonProps} hideText startIcon={{ remixName: "ri-close-line" }} onClick={onClose} />
                ) : null}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              {footer?.startContent || footer?.endContent ? (
                <ModalFooter>
                  <div>{footer?.startContent}</div>
                  <div>{footer?.endContent}</div>
                </ModalFooter>
              ) : null}
            </Inner>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

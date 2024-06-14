"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo/variants/typo-default";

import { TModalProps } from "./modal.types";
import { ModalCoreVariants } from "./modal.variants";

export function ModalCore({
  classNames,
  children,
  titleProps,
  closeButtonProps,
  footerStartContent,
  footerEndContent,
  onClose,
  title,
  ...props
}: TModalProps) {
  const { size, ...htmlProps } = props;
  const slots = ModalCoreVariants({ size });

  return (
    <Modal
      {...htmlProps}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        body: cn(slots.body(), classNames?.body),
        backdrop: cn(slots.backdrop(), classNames?.backdrop),
        header: cn(slots.header(), classNames?.header),
        footer: cn(slots.footer(), classNames?.footer),
      }}
      hideCloseButton
      onClose={onClose}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>
              <Typo {...titleProps} classNames={{ base: "truncate" }}>
                {title}
              </Typo>
              {!htmlProps.isDismissable ? (
                <Button {...closeButtonProps} hideText startIcon={{ remixName: "ri-close-line" }} onClick={onClose} />
              ) : null}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footerStartContent || footerEndContent ? (
              <ModalFooter>
                {footerStartContent ?? <div />}
                {footerEndContent}
              </ModalFooter>
            ) : null}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

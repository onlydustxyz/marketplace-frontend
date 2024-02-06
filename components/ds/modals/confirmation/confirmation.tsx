import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { MouseEvent, useMemo } from "react";

import { Button } from "components/ds/button/button";
import { Typography } from "components/layout/typography/typography";

import { TConfirmationModal } from "./confirmation.types";

export function ConfirmationModal({
  content,
  onOpen,
  width = 350,
  onClose,
  title,
  buttons,
  closeOnCancel = true,
  closeOnConfirm = true,
  open = false,
}: TConfirmationModal.Props) {
  const modalWidth = useMemo(() => (width ? { width } : {}), [width]);
  const { confirm, cancel } = buttons || {};

  function onConfirm(e: MouseEvent<HTMLButtonElement>) {
    if (closeOnConfirm) {
      onClose();
    }

    confirm?.onClick?.(e);
  }
  function onCancel(e: MouseEvent<HTMLButtonElement>) {
    if (closeOnCancel) {
      onClose();
    }

    cancel?.onClick?.(e);
  }

  return (
    <Modal
      isOpen={open}
      placement="center"
      onOpenChange={onOpen}
      onClose={onClose}
      backdrop="opaque"
      hideCloseButton={true}
      classNames={{
        backdrop: "bg-[#0E0D2E]/80",
      }}
    >
      <ModalContent className="bg-greyscale-900" style={modalWidth}>
        <ModalBody className="flex w-full flex-col gap-2 p-4">
          <Typography as="div" variant="title-s" className="w-full text-center">
            {title}
          </Typography>
          <Typography as="div" variant="body-s" className="w-full text-center text-spaceBlue-200">
            {content}
          </Typography>
        </ModalBody>
        {confirm && cancel ? (
          <ModalFooter className="flex w-full flex-row items-center justify-center gap-2 border-t-1 border-card-border-light p-4">
            {confirm && (
              <Button variant="secondary" size="xs" {...confirm} className={confirm.className} onClick={onConfirm} />
            )}
            {cancel && (
              <Button variant="tertiary" size="xs" {...cancel} className={cancel.className} onClick={onCancel} />
            )}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
}

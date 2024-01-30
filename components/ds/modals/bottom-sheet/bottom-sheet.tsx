import { TBottomSheet } from "./bottom-sheet.types";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Typography } from "components/layout/typography/typography";
import { Button } from "components/ds/button/button";
import CloseLine from "src/icons/CloseLine";

export function BottomSheet({ children, onOpen, title, open = false }: TBottomSheet.Props) {
  return (
    <Modal isOpen={open} placement="bottom" onOpenChange={onOpen} backdrop="opaque" hideCloseButton={true}>
      <ModalContent className="mx-0 my-0 max-w-full bg-greyscale-900 sm:mx-0 sm:my-0">
        {onClose => (
          <>
            <ModalHeader className="flex flex-row items-center justify-between gap-1 p-6 pb-4">
              <Typography as="div" variant="title-m">
                {title}
              </Typography>
              <Button size="s" variant="secondary" iconOnly onClick={onClose}>
                <CloseLine />
              </Button>
            </ModalHeader>
            <ModalBody className="px-6 py-0 pb-6">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

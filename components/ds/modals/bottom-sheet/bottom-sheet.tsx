import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Typography } from "components/layout/typography/typography";

import { TBottomSheet } from "./bottom-sheet.types";

export function BottomSheet({
  children,
  onOpen,
  onClose,
  title,
  open = false,
  background = "grey",
  hasCloseButton = true,
  fullScreen = false,
}: TBottomSheet.Props) {
  return (
    <Modal
      isOpen={open}
      placement="bottom"
      onOpenChange={onOpen}
      onClose={onClose}
      backdrop="opaque"
      hideCloseButton={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent
        className={cn(
          "m-0 max-w-full rounded-b-none bg-greyscale-900",
          {
            "bg-card-background-base": background === "blue",
            "h-[calc(100%_-_48px)]": fullScreen,
          },
          "transition-all"
        )}
      >
        {onClose => (
          <>
            {title || hasCloseButton ? (
              <ModalHeader className="flex flex-row items-center justify-between gap-1 p-6 pb-4">
                <Typography as="div" variant="title-m">
                  {title}
                </Typography>
                {hasCloseButton && (
                  <Button size="s" variant="secondary" iconOnly onClick={onClose}>
                    <CloseLine />
                  </Button>
                )}
              </ModalHeader>
            ) : null}
            <ModalBody className="px-6 py-0 pb-6">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

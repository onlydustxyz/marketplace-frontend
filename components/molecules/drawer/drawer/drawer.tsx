import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useHasStackOpened } from "libs/react-stack";
import React, { useMemo } from "react";

import { Flex } from "@/components/layout/flex/flex";
import { Icon } from "@/components/layout/icon/icon";
import { Typography } from "@/components/layout/typography/typography";
import { cn } from "@/utils/cn";

import { TDrawer } from "./drawer.types";

const SafeDrawer = ({
  children,
  isFullWidth,
  header,
  footer,
  noPadding,
  isSmall,
  form,
  classNames,
  ...props
}: TDrawer.Props) => {
  const InnerContent = form ? "form" : "div";
  const hasOpenedStack = useHasStackOpened();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyForm = form as any;

  const headerRender = useMemo(() => {
    if (header) {
      if (React.isValidElement(header)) {
        return <ModalHeader>{header}</ModalHeader>;
      } else if (typeof header === "object" && "title" in header) {
        return (
          <ModalHeader>
            <Flex alignItems="center" className="gap-2">
              {header?.icon ? <Icon size={24} {...header.icon} /> : null}

              <Typography variant="title-l">{header?.title}</Typography>
            </Flex>
          </ModalHeader>
        );
      }
    }
    return null;
  }, [header]);

  return (
    <Modal
      // This needs to be applied or any stacks opened on top cannot be scrolled.
      shouldBlockScroll={!hasOpenedStack}
      backdrop="opaque"
      isDismissable={!hasOpenedStack}
      onClose={hasOpenedStack ? undefined : props.onClose}
      portalContainer={document.getElementById("modal-root") as HTMLElement}
      classNames={{
        ...(classNames || {}),
        backdrop: cn("bg-foreground-900/50", classNames?.backdrop),
        wrapper: "justify-end",
        body: cn("overflow-hidden", {
          "p-0": noPadding,
        }),
        base: cn("rounded-none !m-0 h-full bg-background max-w-[calc(100%-80px)] w-6/12", {
          "w-full": isFullWidth,
          "w-[745px]": isSmall,
        }),
      }}
      motionProps={{
        variants: {
          initial: {
            x: 0,
          },
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: isFullWidth ? 0.2 : 0.3,
              ease: "easeIn",
            },
          },
          exit: {
            x: isFullWidth ? 100 : "100%",
            opacity: isFullWidth ? 0 : 1,
            transition: {
              duration: isFullWidth ? 0.2 : 0.3,
              ease: "easeOut",
            },
          },
        },
      }}
      {...props}
    >
      <InnerContent {...(anyForm || {})}>
        <ModalContent>
          {headerRender}

          <ModalBody>{children}</ModalBody>

          {footer ? (
            <ModalFooter className="bg-default-50">
              <Flex alignItems="center" className="gap-4">
                {footer.cancelButton ? <Button color="danger" variant="ghost" {...footer.cancelButton} /> : null}
                {footer.confirmButton ? <Button color="primary" variant="solid" {...footer.confirmButton} /> : null}
              </Flex>
            </ModalFooter>
          ) : null}
        </ModalContent>
      </InnerContent>
    </Modal>
  );
};
export function Drawer(props: TDrawer.Props) {
  if (props.isOpen) {
    return <SafeDrawer {...props}>{props.children}</SafeDrawer>;
  }

  return null;
}

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { ElementType, useMemo } from "react";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { DrawerNextUiVariants } from "components/molecules/drawer/adapters/next-ui/next-ui.variants";
import { DrawerPort } from "components/molecules/drawer/drawer.types";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function DrawerNextUiAdapter<C extends ElementType = "div">({
  htmlProps,
  as,
  classNames,
  isOpen,
  onOpenChange,
  header,
  footer,
  children,
  size,
}: DrawerPort<C>) {
  const Inner = as || "div";
  const slots = DrawerNextUiVariants({ size });
  const isDesktop = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  const motionProps = useMemo(() => {
    if (!isDesktop) return undefined;

    return {
      variants: {
        initial: {
          x: 100,
          opacity: 0,
          transition: { duration: 0.3, type: "tween" },
        },
        enter: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, type: "tween" },
        },
        exit: {
          x: 100,
          opacity: 0,
          transition: { duration: 0.3, type: "tween" },
        },
      },
    };
  }, [isDesktop]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
      portalContainer={(document.getElementById("modal-root") as HTMLElement) || undefined}
      classNames={{
        base: cn(slots.base(), classNames?.container),
        body: cn(slots.body(), classNames?.body),
        footer: cn(slots.footer(), classNames?.footer),
        header: cn(slots.header(), classNames?.header),
        wrapper: slots.wrapper(),
        backdrop: slots.backdrop(),
      }}
      motionProps={motionProps}
    >
      <Inner {...(htmlProps || {})}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <div>{header?.startContent}</div>
                <div className="flex items-center justify-end gap-2">
                  <div>{header?.endContent}</div>
                  <Button
                    onClick={onClose}
                    startIcon={{ remixName: "ri-close-line" }}
                    hideText
                    variant="secondary-light"
                  />
                </div>
              </ModalHeader>

              <ModalBody>{children}</ModalBody>

              {footer && (
                <ModalFooter>
                  <div>{footer?.startContent}</div>
                  <div>{footer?.endContent}</div>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Inner>
    </Modal>
  );
}

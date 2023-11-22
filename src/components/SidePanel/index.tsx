import { Fragment, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useSidePanelStack } from "src/hooks/useSidePanelStack";
import { cn } from "src/utils/cn";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  action?: ReactElement;
  placement?: "right" | "bottom";
  hasCloseButton?: boolean;
  withBackdrop?: boolean;
} & PropsWithChildren;

export default function SidePanel({
  open,
  setOpen,
  action,
  placement = "right",
  children,
  hasCloseButton = true,
  withBackdrop,
}: Props) {
  const { open: openSidePanel, close: closeSidePanel } = useSidePanelStack();

  const [panelIndex, setPanelIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setPanelIndex(openSidePanel(setOpen));
    }
  }, [open]);

  function onClose() {
    setOpen(false);
    closeSidePanel();
  }

  const transitionProps = {
    right: {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
    },
    bottom: {
      enterFrom: "translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "translate-y-full",
    },
  }[placement];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} as="div" className="relative isolate z-50">
        {withBackdrop && (
          <div className="fixed bottom-0 z-10 h-screen w-screen bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        )}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          leave="transform transition ease-in-out duration-300"
          {...transitionProps}
        >
          <Dialog.Panel
            className={cn(
              {
                "inset-y-0 right-0 h-[calc(100dvh)] lg:w-[680px] lg:max-w-[80%]": placement === "right",
                "inset-x-0 bottom-0 max-h-[calc(100dvh)] overflow-y-auto rounded-t-2xl": placement === "bottom",
              },
              "fixed w-full bg-greyscale-900"
            )}
            // z-index needs to start at 50 to show above tooltips on the page behind
            style={{ zIndex: 50 + panelIndex }}
          >
            <div className="h-full overflow-y-auto">
              {hasCloseButton && (
                <div className="absolute right-3.5 top-3.5 z-20 flex flex-row gap-2">
                  {action}
                  <Button
                    size={ButtonSize.Sm}
                    type={ButtonType.Secondary}
                    iconOnly
                    onClick={onClose}
                    data-testid="close-add-work-item-panel-btn"
                  >
                    <CloseLine />
                  </Button>
                </div>
              )}
              {children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

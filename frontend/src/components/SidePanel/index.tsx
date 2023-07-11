import { Fragment, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useSidePanelStack } from "src/hooks/useSidePanelStack";
import classNames from "classnames";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  action?: ReactElement;
  placement?: "right" | "bottom";
  hasCloseButton?: boolean;
} & PropsWithChildren;

export default function SidePanel({
  open,
  setOpen,
  action,
  children,
  placement = "right",
  hasCloseButton = true,
}: Props) {
  useEffect(() => {
    document.body.style.setProperty("overflow", "auto");
  }, [open]);

  const { open: openSidePanel, close: closeSidePanel } = useSidePanelStack();

  const [panelIndex, setPanelIndex] = useState(0);

  const onClose = () => {
    setOpen(false);
    closeSidePanel();
  };

  useEffect(() => {
    if (open) {
      setPanelIndex(openSidePanel());
    }
  }, [open]);

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
    <Transition
      show={open}
      as={Fragment}
      enter="transform transition ease-in-out duration-300"
      leave="transform transition ease-in-out duration-300"
      {...transitionProps}
    >
      <Dialog open={open} onClose={onClose} as={Fragment}>
        <Dialog.Panel
          className={classNames(
            {
              "inset-y-0 right-0 h-[calc(100dvh)] lg:w-3/5 xl:w-5/12": placement === "right",
              "inset-x-0 bottom-0 max-h-[calc(100dvh)] min-h-min overflow-y-auto rounded-t-2xl": placement === "bottom",
            },
            "fixed w-full bg-greyscale-900 blur-0"
          )}
          style={{ zIndex: 10 + panelIndex }}
        >
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
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

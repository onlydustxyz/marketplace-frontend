import { Fragment, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useSidePanelStack } from "src/hooks/useSidePanelStack";
import classNames from "classnames";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  action?: ReactElement;
  hasCloseButton?: boolean;
  withBackdrop?: boolean;
} & PropsWithChildren;

export default function SidePanel({ open, setOpen, action, children, hasCloseButton = true, withBackdrop }: Props) {
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const { open: openSidePanel, close: closeSidePanel, openPanelCount, closeLastPanel } = useSidePanelStack();

  const [panelIndex, setPanelIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setPanelIndex(openSidePanel(setOpen));
    }
  }, [open]);

  const isCoveredPanel = panelIndex < openPanelCount - 1;

  function onClose() {
    setOpen(false);
    closeSidePanel();
  }

  function handleClick() {
    if (isCoveredPanel) {
      closeLastPanel();
    }
  }

  const transitionProps = isLg
    ? {
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
      }
    : {
        enterFrom: "translate-y-full",
        enterTo: "translate-y-0",
        leaveFrom: "translate-y-0",
        leaveTo: "translate-y-full",
      };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} as="div">
        {withBackdrop && <div className="fixed bottom-0 h-screen w-screen bg-black/40" aria-hidden="true" />}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          leave="transform transition ease-in-out duration-300"
          {...transitionProps}
        >
          <Dialog.Panel
            className={classNames(
              {
                "inset-y-0 right-0 h-[calc(100dvh)] lg:w-2/5 xl:w-4/12": isLg,
                "inset-x-0 bottom-0 max-h-[calc(100dvh)] min-h-min overflow-y-auto rounded-t-2xl": !isLg,
                "-translate-x-10 blur-sm transition duration-300": isCoveredPanel && isLg,
              },
              " fixed w-full bg-greyscale-900 blur-0"
            )}
            style={{ zIndex: 10 + panelIndex }}
          >
            <div onClick={handleClick} className="h-full">
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

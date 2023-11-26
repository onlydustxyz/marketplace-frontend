import { CSSProperties, Fragment, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";
import { StackDrop } from "./StackDrop";
import { debounce } from "lodash";
import { BackClick } from "./BackClick";

type Props = {
  open: boolean;
  close: () => void;
  action?: ReactElement;
  placement?: "right" | "bottom";
  hasCloseButton?: boolean;
  front?: boolean;
  back?: boolean;
  stacked?: boolean;
} & PropsWithChildren;

export default function SidePanel({
  open,
  close,
  action,
  placement = "right",
  children,
  front,
  back,
  stacked,
  hasCloseButton = true,
}: Props) {
  const [debouncedOpen, setDebouncedOpen] = useState(false);

  const debounceOpen = useCallback(
    debounce(newOpen => {
      setDebouncedOpen(newOpen);
    }, 10),
    []
  );

  useEffect(() => {
    debounceOpen(open);
  }, [open]);

  const onClose = () => {
    setDebouncedOpen(false);
    close();
  };

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

  const PanelBackStyle: CSSProperties = {
    transform: "translateX(-40px) scale(0.99)",
    transition: "ease-in 300ms transform",
    backdropFilter: "blur(2px)",
  };

  const BasePanelStyle: CSSProperties = {
    transition: "ease-out 300ms transform",
  };

  return (
    <Transition.Root show={debouncedOpen} as={Fragment}>
      <div className="relative isolate z-50">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          leave="transform transition ease-in duration-300"
          {...transitionProps}
        >
          <div
            className={cn(
              {
                "inset-y-0 right-0 h-[calc(100dvh)] lg:w-[680px] lg:max-w-[80%]": placement === "right",
                "inset-x-0 bottom-0 max-h-[calc(100dvh)] overflow-y-auto rounded-t-2xl": placement === "bottom",
              },
              "fixed w-full bg-greyscale-900 shadow-panel"
            )}
            style={back ? PanelBackStyle : BasePanelStyle}
          >
            {front && stacked ? <BackClick onClick={onClose} /> : null}
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
            <StackDrop show={!!back} />
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
}

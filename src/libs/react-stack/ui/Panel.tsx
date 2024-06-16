import { Transition } from "@headlessui/react";
import { debounce } from "lodash";
import { CSSProperties, Fragment, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from "react";

import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";

import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";

import { usePlacement } from "../hooks/usePlacement";
import { Options } from "../types/Stack";
import { BackClick } from "./BackClick";
import { StackDrop } from "./StackDrop";

type Props = {
  open: boolean;
  close: () => void;
  action?: ReactElement;
  topLeftComponent?: ReactElement;
  hasCloseButton?: boolean;
  front?: boolean;
  back?: boolean;
  stacked?: boolean;
  hidden?: boolean;
  option?: Options["panel"];
} & PropsWithChildren;

export default function SidePanel({
  open,
  close,
  action,
  topLeftComponent,
  children,
  front,
  back,
  stacked,
  hidden,
  option,
  hasCloseButton = true,
}: Props) {
  const { placement } = usePlacement();
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

  const BottomStyle: CSSProperties = {
    height: !stacked && !back && !hidden ? "calc(100dvh - 40px)" : "calc(100dvh - 80px)",
  };

  const PanelBackStyle: CSSProperties = {
    transform: placement === "bottom" ? "translateY(-40px) scale(0.99)" : "translateX(-40px) scale(0.99)",
    transition: "ease-in 300ms all",
    backdropFilter: "blur(2px)",
    ...(placement === "bottom" ? BottomStyle : {}),
  };

  const BasePanelStyle: CSSProperties = {
    transition: "ease-out 300ms all",
    ...(placement === "bottom" ? BottomStyle : {}),
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
                "h-[calc(100dvh)] md:w-[680px] md:max-w-[80%]": placement === "right",
                "rounded-t-2xl md:rounded-none": placement === "bottom",
              },
              "fixed bottom-0 right-0 w-full bg-greyscale-900 shadow-panel"
            )}
            style={back ? PanelBackStyle : BasePanelStyle}
          >
            {front && stacked ? <BackClick onClick={onClose} /> : null}
            <div
              className={cn("relative h-full overflow-y-auto", {
                "pt-6": !option?.noPadding,
                "bg-white": option?.theme === "light",
                "bg-container-1": option?.theme === "new",
              })}
            >
              {topLeftComponent ? (
                <div className="absolute left-6 top-6 z-20 flex flex-row gap-2">{topLeftComponent}</div>
              ) : null}
              {hasCloseButton && (
                <div className="absolute right-6 top-6 z-20 flex flex-row gap-2">
                  {action}
                  {option?.theme === "new" ? (
                    <ButtonSecondaryLight
                      size="l"
                      hideText
                      onClick={onClose}
                      startIcon={{ remixName: "ri-close-line" }}
                    >
                      <CloseLine />
                    </ButtonSecondaryLight>
                  ) : (
                    <Button
                      size={ButtonSize.Sm}
                      type={option?.theme === "light" ? ButtonType.SecondaryDark : ButtonType.Secondary}
                      iconOnly
                      onClick={onClose}
                      data-testid="close-add-work-item-panel-btn"
                    >
                      <CloseLine />
                    </Button>
                  )}
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

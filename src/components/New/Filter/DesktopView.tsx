import { Popover, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";
import FilterIcon from "src/assets/icons/FilterIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Refresh from "src/icons/Refresh";
import { cn } from "src/utils/cn";

export enum FilterPosition {
  Left,
  Right,
}

export function DesktopView({
  children,
  isActive,
  onClear,
  position = FilterPosition.Right,
  className,
}: PropsWithChildren<{
  isActive: boolean;
  onClear: () => void;
  position?: FilterPosition;
  className?: string;
}>) {
  const { T } = useIntl();

  return (
    <Popover className={cn("relative", className)}>
      {({ open }) => (
        <>
          <Popover.Button
            as={Button}
            type={ButtonType.Secondary}
            size={ButtonSize.Sm}
            pressed={open}
            className={cn({
              "border-spacePurple-200 text-spacePurple-100": isActive,
            })}
          >
            <FilterIcon />
            {T("filter.title")}
          </Popover.Button>

          <Transition
            enter="transform transition duration-100 ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transform transition duration-75 ease-out"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
            className="origin-top-left"
          >
            <Popover.Panel
              static
              className={cn(
                "absolute right-0 z-10 flex translate-y-1.5 flex-col divide-y divide-card-border-light rounded-2xl border border-card-border-medium bg-greyscale-900 shadow-xl [&>*]:px-6 [&>*]:py-3",
                {
                  "right-0": position === FilterPosition.Right,
                  "left-0": position === FilterPosition.Left,
                }
              )}
            >
              <div className="flex justify-between px-6 py-3">
                <p className="font-belwe text-base text-greyscale-50">{T("filter.title")}</p>
                {isActive ? (
                  <Button type={ButtonType.Ternary} size={ButtonSize.Xs} onClick={onClear}>
                    <Refresh />
                    {T("filter.clearButton")}
                  </Button>
                ) : null}
              </div>

              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

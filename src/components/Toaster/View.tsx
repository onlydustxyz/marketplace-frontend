import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { viewportConfig } from "src/config";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  message: string;
  visible: boolean;
  isError: boolean;
  setVisible: (visible: boolean) => void;
}

export default function View({ message, visible, isError, setVisible }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  return (
    <Transition
      as="div"
      className="fixed bottom-8 left-8 z-20"
      show={visible}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        data-testid="toaster-message"
        className="overflow-hidden rounded-2xl p-0.5"
        onClick={() => {
          setVisible(false);
        }}
      >
        {isXl ? (
          <div
            className={classNames(
              "relative flex items-center justify-center rounded-[15px] before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen",
              {
                "bg-orange-900 before:bg-orange-500": isError,
                "bg-spaceBlue-900 before:animate-spin-invert-slow before:bg-multi-color-gradient": !isError,
              }
            )}
          >
            <div className="flex w-fit max-w-xl items-center gap-2 rounded-[15px] bg-white/4 bg-noise-medium p-4">
              {isError ? <ErrorWarningLine className="text-3xl text-orange-500" /> : <CheckLine className="text-3xl" />}
              <span className="font-walsheim text-base">{message}</span>
            </div>
          </div>
        ) : (
          <div
            className={classNames(
              "relative flex items-center justify-center overflow-hidden rounded-[15px] p-px before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen",
              {
                "before:bg-orange-500": isError,
                "before:bg-multi-color-gradient": !isError,
              }
            )}
          >
            <div className="border-1 w-full rounded-[15px] border border-transparent">
              <div
                className={classNames("rounded-[15px]", {
                  "bg-orange-900": isError,
                  "bg-spaceBlue-900": !isError,
                })}
              >
                <div className="flex w-fit max-w-xl items-center gap-2 rounded-[15px] bg-white/4 bg-noise-medium p-4">
                  {isError ? (
                    <ErrorWarningLine className="text-3xl text-orange-500" />
                  ) : (
                    <CheckLine className="text-3xl" />
                  )}
                  <span className="font-walsheim text-base">{message}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Transition>
  );
}

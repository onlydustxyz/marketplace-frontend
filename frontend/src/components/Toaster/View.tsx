import { Transition } from "@headlessui/react";
import classNames from "classnames";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";

interface Props {
  message: string;
  visible: boolean;
  isError: boolean;
}

export default function View({ message, visible, isError }: Props) {
  return (
    <Transition
      as="div"
      className="fixed bottom-8 left-8 z-10"
      show={visible}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div data-testid="toaster-message" className="overflow-hidden rounded-2xl p-0.5">
        <div
          className={classNames(
            "relative flex items-center justify-center rounded-2xl before:absolute before:-z-10 before:h-screen before:w-screen",
            {
              "bg-orange-900 before:bg-orange-500": isError,
              "bg-spaceBlue-900 before:animate-spin-invert-slow before:bg-multi-color-gradient": !isError,
            }
          )}
        >
          <div className="flex w-fit max-w-xl items-center gap-2 rounded-2xl bg-white/4 bg-noise-medium p-6 text-center">
            {isError ? (
              <ErrorWarningLine className="text-2xl font-semibold text-orange-500" />
            ) : (
              <CheckLine className="text-2xl font-semibold" />
            )}
            <span className="font-walsheim text-lg font-semibold">{message}</span>
          </div>
        </div>
      </div>
    </Transition>
  );
}

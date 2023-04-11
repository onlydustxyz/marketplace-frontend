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
      className="fixed z-10 bottom-8 left-8"
      show={visible}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div data-testid="toaster-message" className="rounded-2xl p-0.5 overflow-hidden">
        <div
          className={classNames(
            "relative flex justify-center items-center rounded-2xl before:absolute before:-z-10 before:h-screen before:w-screen",
            {
              "bg-orange-900 before:bg-orange-500": isError,
              "bg-spaceBlue-900 before:bg-multi-color-gradient before:animate-spin-invert-slow": !isError,
            }
          )}
        >
          <div className="rounded-2xl bg-noise-medium bg-white/4 flex items-center text-center w-fit max-w-xl p-6 gap-2">
            {isError ? (
              <ErrorWarningLine className="font-semibold text-2xl text-orange-500" />
            ) : (
              <CheckLine className="font-semibold text-2xl" />
            )}
            <span className="font-walsheim font-semibold text-lg">{message}</span>
          </div>
        </div>
      </div>
    </Transition>
  );
}

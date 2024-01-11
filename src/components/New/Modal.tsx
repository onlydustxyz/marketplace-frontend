import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";
import Action, { ButtonSize, ButtonType } from "../Button";
import Button from "../Button";

type Action = {
  text: string;
  onClick: () => void;
};

type Props = PropsWithChildren<{
  isOpen: boolean;
  title: string;
  description?: string;
  onClose?: () => void;
  cancel?: Action;
  confirm?: Action;
}>;

export function Modal({ isOpen, title, description, onClose, cancel, confirm, children }: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Dialog onClose={onClose ? onClose : () => {}} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-spaceBlue-900/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative mx-auto max-w-md rounded-2xl border border-greyscale-50/12 bg-greyscale-900 shadow-lg">
                {onClose ? (
                  <button
                    className="absolute right-3.5 top-3.5 flex h-6 w-6 items-center justify-center rounded-lg outline-none focus-within:ring-1 focus-within:ring-spacePurple-200"
                    onClick={onClose}
                  >
                    <CloseLine className="text-2xl" />
                  </button>
                ) : null}

                <div className="flex flex-col gap-2 px-6 py-8">
                  <Dialog.Title className="text-center font-belwe text-base text-greyscale-50">{title}</Dialog.Title>
                  {description ? (
                    <Dialog.Description className="text-center font-walsheim text-sm text-greyscale-200">
                      {description}
                    </Dialog.Description>
                  ) : null}
                  {children ? <div>children</div> : null}
                </div>

                <div
                  className={cn(
                    "grid gap-2 border-t border-greyscale-50/12 px-6 py-8",
                    cancel && confirm ? "grid-cols-2" : ""
                  )}
                >
                  {cancel ? (
                    <div>
                      <Button
                        type={ButtonType.Secondary}
                        size={ButtonSize.Md}
                        onClick={cancel.onClick}
                        className="w-full"
                      >
                        {cancel.text}
                      </Button>
                    </div>
                  ) : null}

                  {confirm ? (
                    <div>
                      <Button
                        type={ButtonType.Primary}
                        size={ButtonSize.Md}
                        onClick={confirm.onClick}
                        className="w-full"
                      >
                        {confirm.text}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import { Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";

type Props = {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
} & PropsWithChildren;

export default function SidePanel({ title, open, setOpen, children }: Props) {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transform transition ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <Dialog onClose={setOpen} as={Fragment}>
        <Dialog.Panel className="fixed z-10 inset-y-0 right-0 max-h-screen w-5/12 flex flex-col bg-greyscale-900 py-8 px-6 gap-8">
          <div
            className="absolute top-3.5 right-3.5"
            onClick={() => setOpen(false)}
            data-testid="close-add-work-item-panel-btn"
          >
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              <CloseLine />
            </Button>
          </div>
          <div className="font-belwe font-normal text-2xl text-greyscale-50">{title}</div>
          {children}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

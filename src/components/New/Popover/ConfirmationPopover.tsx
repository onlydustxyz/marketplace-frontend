import { Popover, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";

type Props = {
  onClose: () => void;
  title: string;
  description: string;
  confirm: {
    label: string;
    onClick: () => void;
  };
  cancel: {
    label: string;
    onClick: () => void;
  };
} & PropsWithChildren;

export default function ConfirmationPopOver({ onClose, confirm, cancel, description, title, children }: Props) {
  const handleCancel = () => {
    cancel.onClick();
    onClose();
  };
  const handleConfirm = () => {
    confirm.onClick();
    onClose();
  };

  return (
    <Popover className="relative">
      <Popover.Button as="div">{children}</Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10">
          <Card
            padded={false}
            fullWidth={false}
            withBg={false}
            className="w-60 divide-y divide-solid divide-greyscale-50/8 bg-greyscale-900"
          >
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="font-belwe text-base font-normal text-greyscale-50">{title}</div>
              <div className="font-walsheim text-sm font-normal text-spaceBlue-200">{description}</div>
            </div>
            <div className="flex flex-row items-stretch gap-2 p-3">
              <Button type={ButtonType.Secondary} size={ButtonSize.Xs} width={Width.Full} onClick={handleCancel}>
                {cancel.label}
              </Button>
              <Button size={ButtonSize.Xs} width={Width.Full} onClick={handleConfirm}>
                {confirm.label}
              </Button>
            </div>
          </Card>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

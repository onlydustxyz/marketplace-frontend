import { Menu, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";
import AddLine from "src/icons/AddLine";
import EyeOffLine from "src/icons/EyeOffLine";

type Props = {
  disabled?: boolean;
  add: {
    label: string;
    onClick: () => void;
  };
  ignore: {
    label: string;
    onClick: () => void;
  };
} & PropsWithChildren;

export default function QuickActionsMenu({ add, ignore, children, disabled }: Props) {
  const handleAdd = () => {
    add.onClick();
  };
  const handleIgnore = () => {
    ignore.onClick();
  };

  return (
    <Menu as="div" className="inline-block text-left">
      <div>{disabled ? <div>{children}</div> : <Menu.Button as="div">{children}</Menu.Button>}</div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative z-10"
      >
        <Menu.Items className="absolute -left-6 -top-12 z-40 w-auto min-w-max origin-top-right rounded-xl bg-greyscale-900 p-2 font-walsheim text-sm font-normal shadow-medium outline-none focus:outline-none">
          <div className="cursor-pointer rounded p-2 hover:bg-white/5">
            <Menu.Item as="div" onClick={handleAdd}>
              <AddLine className="mr-2" />
              {add.label}
            </Menu.Item>
          </div>
          <div className="cursor-pointer rounded p-2 hover:bg-white/5">
            <Menu.Item as="div" onClick={handleIgnore}>
              <EyeOffLine className="mr-2" />
              {ignore.label}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

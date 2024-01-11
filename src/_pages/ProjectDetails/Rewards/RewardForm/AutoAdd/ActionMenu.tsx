import { Menu, Transition } from "@headlessui/react";
import { ReactNode, PropsWithChildren } from "react";

type ActionItem = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
};

type Props = {
  disabled?: boolean;
  actions: ActionItem[];
} & PropsWithChildren;

export default function ActionMenu({ actions, children, disabled }: Props) {
  return (
    <Menu as="div" className="inline-block text-left">
      <div>{disabled ? <div>{children}</div> : <Menu.Button>{children}</Menu.Button>}</div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative z-10"
      >
        <Menu.Items className="absolute -top-12 right-0 z-40 w-auto min-w-max origin-top-right rounded-xl bg-greyscale-900 p-2 font-walsheim text-sm font-normal shadow-medium outline-none focus:outline-none">
          {actions.map((action, index) => (
            <Menu.Item
              key={index}
              as="button"
              type="button"
              className="block w-full rounded p-2 text-left hover:bg-white/5"
              onClick={action.onClick}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

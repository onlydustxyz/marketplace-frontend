import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { Option } from "./types";
import { Size } from ".";

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  size: Size;
};

export default function View({ options, size, ...props }: Props) {
  return (
    <Listbox {...props}>
      <Listbox.Options static as="div" className="flex flex-wrap gap-x-2 gap-y-3">
        {options.map((value, index) => (
          <Listbox.Option
            key={index}
            as="div"
            value={value.value ?? value.label}
            className={classNames(
              "flex flex-row items-center gap-1",
              "w-fit border border-greyscale-50/8 bg-white/8 font-walsheim text-sm font-normal text-neutral-100",
              "hover:cursor-pointer",
              "ui-selected:pseudo-outline-2",
              "ui-selected:before:z-10",
              "ui-selected:before:border-spacePurple-500",
              "ui-selected:border-transparent ui-selected:bg-spacePurple-900",
              {
                "rounded-xl px-3 py-2": size === Size.Md,
                "rounded-2xl px-4 py-3": size === Size.Lg,
              }
            )}
          >
            {value.icon}
            {value.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

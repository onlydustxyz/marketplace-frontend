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
              "flex flex-row gap-1 items-center",
              "w-fit text-neutral-100 font-walsheim font-normal text-sm bg-white/8 border border-greyscale-50/8",
              "hover:cursor-pointer",
              "ui-selected:pseudo-outline-2",
              "ui-selected:before:z-10",
              "ui-selected:before:border-spacePurple-500",
              "ui-selected:border-transparent ui-selected:bg-spacePurple-900",
              {
                "py-2 px-3 rounded-xl": size === Size.Md,
                "py-3 px-4 rounded-2xl": size === Size.Lg,
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

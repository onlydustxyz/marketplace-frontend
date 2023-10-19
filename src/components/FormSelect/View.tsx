import { Listbox } from "@headlessui/react";
import { FormOption } from "src/components/FormOption/FormOption";
import { Size } from ".";
import { Option } from "./types";

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
          <Listbox.Option key={index} as={FormOption} value={value.value ?? value.label} size={size} className="w-fit">
            {value.icon}
            {value.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

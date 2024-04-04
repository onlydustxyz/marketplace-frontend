import { RadioGroup as NextRadioGroup } from "@nextui-org/react";

import { RadioGroupItem } from "components/ds/form/radio-group/radio-group-item/radio-group-item";

import { TRadioGroup } from "./radio-group.types";

export function RadioGroup<V extends string>({ onChange, ...props }: TRadioGroup.Props<V>) {
  const handleChange = (value: string) => {
    onChange(value as V);
  };

  return <NextRadioGroup {...props} onValueChange={handleChange} />;
}

RadioGroup.Item = RadioGroupItem;

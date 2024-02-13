import { RadioGroupItem } from "components/ds/form/radio-group/radio-group-item/radio-group-item";

import { TRadioGroupCustom } from "./radio-group-custom.types";

export function RadioGroupCustom<V extends string>({ onChange, value, children }: TRadioGroupCustom.Props<V>) {
  const handleChange = (value: string) => {
    onChange(value as V);
  };

  const childrenElements = children({ value, onChange: handleChange });

  return <>{childrenElements.map(child => child)}</>;
}

RadioGroupCustom.Item = RadioGroupItem;

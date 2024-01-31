import { CheckboxGroup } from "@nextui-org/react";
import { isArray } from "lodash";
import { FormEvent, useMemo } from "react";

import { cn } from "src/utils/cn";

import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";

import { TSelectableTag } from "./selectable-tag.types";

export function SelectableTag<V extends string>({ className, value, options, ...props }: TSelectableTag.Props<V>) {
  const valueArray = useMemo(() => {
    if (isArray(value)) {
      return value;
    }

    if (value) {
      return [value];
    }

    return [];
  }, [value]);

  function handleChange(newValue: string[] | FormEvent<HTMLDivElement>) {
    if (isArray(newValue)) {
      if (props.mode === "multiple") {
        props.onChange(newValue as V[]);
      } else {
        const lastValue = newValue.at(-1);
        if (lastValue === value) {
          props.onChange(null);
        } else {
          props.onChange(lastValue as V);
        }
      }
    }
  }

  return (
    <CheckboxGroup
      className={cn("gap-1", className)}
      orientation="horizontal"
      value={valueArray}
      {...props}
      onChange={handleChange}
    >
      {options.map(option => (
        <SelectableTagItem key={option.value} {...option} />
      ))}
    </CheckboxGroup>
  );
}

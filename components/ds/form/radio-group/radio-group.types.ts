import { RadioGroupProps } from "@nextui-org/react";

export namespace TRadioGroup {
  export type BaseProps = Partial<Omit<RadioGroupProps, "value" | "onChange">>;
  export interface Props<V extends string> extends BaseProps {
    value: V;
    onChange: (value: V) => void;
  }
}

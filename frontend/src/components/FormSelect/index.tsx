import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import View from "./View";
import { Option } from "./types";

export enum Size {
  Md = "md",
  Lg = "lg",
}

type Props<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues> = {
  name: TName;
  control?: Control<TFieldValues>;
  options: Option[];
  size?: Size;
};

export default function FormSelect<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues>({
  name,
  control,
  options,
  size = Size.Md,
}: Props<TName, TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => <View {...{ size, options, value, onChange }} />}
    />
  );
}

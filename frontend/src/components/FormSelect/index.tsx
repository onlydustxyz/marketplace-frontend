import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import View from "./View";
import { Option } from "./types";

type Props<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues> = {
  name: TName;
  control?: Control<TFieldValues>;
  options: Option[];
};

export default function FormSelect<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues>({
  name,
  control,
  options,
}: Props<TName, TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => <View {...{ options, value, onChange }} />}
    />
  );
}

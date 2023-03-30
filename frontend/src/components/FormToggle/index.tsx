import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import View from "./View";

type Props<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues> = {
  name: TName;
  label: string;
  control?: Control<TFieldValues>;
};

const FormToggle = <TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues>({
  name,
  label,
  control,
}: Props<TName, TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => <View {...{ checked: !!value, label, onChange }} />}
  />
);

export default FormToggle;

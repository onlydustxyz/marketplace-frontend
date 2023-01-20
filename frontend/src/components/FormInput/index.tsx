import { ChangeEventHandler } from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";
import View from "./View";

type PropsType = {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  loading?: boolean;
  options?: RegisterOptions;
  value?: string | number;
  onChange?: ChangeEventHandler<any>;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  loading,
  options,
  onChange,
}: PropsType) {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });

  return (
    <View
      {...{
        name,
        label,
        error: errors[name],
        loading,
        placeholder,
        type,
        value,
        register: register(name, options),
        onChange,
      }}
    />
  );
}

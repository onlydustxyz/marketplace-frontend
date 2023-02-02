import { defaults } from "lodash";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";
import View, { InputErrorType } from "./View";

type PropsType = {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  loading?: boolean;
  options?: RegisterOptions;
  value?: string | number;
  errorType?: InputErrorType;
  onChange?: ChangeEventHandler<unknown>;
  onFocus?: FocusEventHandler<unknown>;
  onBlur?: FocusEventHandler<unknown>;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  errorType,
  loading,
  options,
  onChange,
  onBlur,
  onFocus,
  prefixComponent,
  suffixComponent,
}: PropsType) {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const overridenRegister = defaults(
    {
      onChange,
      onBlur,
      name,
    },
    register(name, options)
  );

  return (
    <View
      {...{
        label,
        error: errors[name],
        errorType: errorType || InputErrorType.Normal,
        loading,
        placeholder,
        type,
        value,
        register: overridenRegister,
        onFocus,
        prefixComponent,
        suffixComponent,
      }}
    />
  );
}

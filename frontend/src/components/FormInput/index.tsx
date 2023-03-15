import { defaults } from "lodash";
import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, PropsWithChildren } from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";
import View, { InputErrorDisplay } from "./View";

type PropsType = {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  loading?: boolean;
  options?: RegisterOptions;
  value?: string | number;
  errorDisplay?: InputErrorDisplay;
  onChange?: ChangeEventHandler<unknown>;
  onFocus?: FocusEventHandler<unknown>;
  onBlur?: FocusEventHandler<unknown>;
  onKeyDown?: KeyboardEventHandler;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  inputClassName?: string;
  showValidationErrors?: boolean;
  requiredForPayment?: boolean;
  withMargin?: boolean;
} & PropsWithChildren;

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  errorDisplay = InputErrorDisplay.Normal,
  loading,
  options,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  prefixComponent,
  suffixComponent,
  inputClassName,
  showValidationErrors = true,
  requiredForPayment = false,
  withMargin = true,
  children,
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
        errorDisplay,
        loading,
        placeholder,
        type,
        value,
        register: overridenRegister,
        onFocus,
        onKeyDown,
        prefixComponent,
        suffixComponent,
        inputClassName,
        showValidationErrors,
        requiredForPayment,
        withMargin,
        children,
      }}
    />
  );
}

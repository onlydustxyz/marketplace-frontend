import { defaults } from "lodash";
import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";
import { InputErrorDisplay } from "./types";
import View from "./View";
import { forwardRef } from "react";

export enum Size {
  Sm = "sm",
  Md = "md",
}

type PropsType = {
  label?: ReactNode;
  type?: string;
  placeholder?: string;
  name: string;
  loading?: boolean;
  options?: RegisterOptions;
  value?: string | number;
  errorDisplay?: InputErrorDisplay;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  inputClassName?: string;
  showValidationErrors?: boolean;
  requiredForPayment?: boolean;
  withMargin?: boolean;
  as?: React.ElementType;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  size?: Size;
  disabled?: boolean;
} & PropsWithChildren;

const Input = forwardRef(function Input(
  {
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
    as,
    inputProps,
    disabled,
    size = Size.Md,
  }: PropsType,
  ref: ForwardedRef<ReactNode>
) {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const overridenRegister = defaults(
    {
      ref,
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
        as,
        inputProps,
        disabled,
        size,
      }}
    />
  );
});

export default Input;

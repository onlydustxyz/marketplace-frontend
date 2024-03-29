import { defaults } from "lodash";
import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from "react";
import { RegisterOptions, useFormContext, useFormState } from "react-hook-form";

import View from "./View";
import { InputErrorDisplay } from "./types";

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
  errorName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  inputClassName?: string;
  showValidationErrors?: boolean;
  showRequiredError?: boolean;
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
    errorName,
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
    showRequiredError = false,
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
      ref: ref || undefined,
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
        error: errors[errorName || name],
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
        showRequiredError,
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

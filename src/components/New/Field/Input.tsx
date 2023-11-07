import { ChangeEventHandler, FocusEventHandler, ReactNode, Ref, forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";

export interface FieldInputProps extends Omit<FieldProps, "children"> {
  type?: string;
  min?: string;
  step?: string;
  value?: string | number | readonly string[] | undefined;
  className?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  startIcon?: ({ className }: { className: string }) => ReactNode;
  endIcon?: ({ className }: { className: string }) => ReactNode;
}

export const FieldInput = forwardRef(function FieldInput(
  {
    type,
    onBlur,
    onFocus,
    onChange,
    className,
    inputClassName,
    min,
    step,
    value,
    startIcon,
    endIcon,
    placeholder,
    ...rest
  }: FieldInputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <Field {...rest}>
      <div
        className={cn(
          "relative flex w-full items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 text-sm leading-none focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500",
          className
        )}
      >
        {startIcon
          ? startIcon({
              className: "w-3.5 h-3.5 text-spaceBlue-200 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none",
            })
          : null}
        <input
          ref={ref}
          min={min}
          step={step}
          value={value}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          className={cn(
            "h-full w-full bg-transparent px-3 py-2 text-greyscale-50 outline-none placeholder:text-spaceBlue-200",
            inputClassName,
            startIcon && "pl-8",
            endIcon && "pr-8"
          )}
        />
        {endIcon
          ? endIcon({
              className: "w-3.5 h-3.5 text-spaceBlue-200 right-2 top-1/2 -translate-y-1/2 pointer-events-none",
            })
          : null}
      </div>
    </Field>
  );
});

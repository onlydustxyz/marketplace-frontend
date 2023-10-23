import { ChangeEventHandler, FC, FocusEventHandler } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";

export interface FieldTextareaProps extends Omit<FieldProps, "children"> {
  rows?: number;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export const FieldTextarea: FC<FieldTextareaProps> = ({ onBlur, rows, onFocus, onChange, className, ...rest }) => {
  return (
    <Field {...rest}>
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 px-3 py-2 text-sm leading-none focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500",
          className
        )}
      >
        <textarea
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          rows={rows || 3}
          className="w-full bg-transparent text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
        />
      </div>
    </Field>
  );
};

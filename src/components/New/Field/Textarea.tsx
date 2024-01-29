import { ChangeEventHandler, FocusEventHandler, Ref, forwardRef, useEffect, useRef } from "react";

import { cn } from "src/utils/cn";

import { Field, FieldProps } from "./Field";

export interface FieldTextareaProps extends Omit<FieldProps, "children"> {
  rows?: number;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  autogrow?: boolean;
}

export const FieldTextarea = forwardRef(function FieldTextarea(
  { onBlur, rows = 3, onFocus, onChange, className, value, autogrow = false, ...rest }: FieldTextareaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const textAreaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autogrow && textAreaContainerRef.current) {
      const textareaEl = textAreaContainerRef.current.querySelector("textarea");
      if (textareaEl) {
        textareaEl.style.height = ""; // This line is required to allow the text area to resize when the user deletes text
        textareaEl.style.height = textareaEl.scrollHeight + "px";
      }
    }
  }, [autogrow, value, textAreaContainerRef]);

  return (
    <Field {...rest}>
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 px-3 py-2 text-sm leading-none focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500",
          rest.errorMessage && "border-orange-500",
          className
        )}
        ref={textAreaContainerRef}
      >
        <textarea
          value={value ?? ""}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={rest.placeholder}
          onFocus={onFocus}
          rows={rows}
          ref={ref}
          className="scrollbar-sm w-full bg-transparent font-walsheim text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
        />
      </div>
    </Field>
  );
});

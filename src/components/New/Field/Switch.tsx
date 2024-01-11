import { Switch as HeadlessSwitch } from "@headlessui/react";

import { FocusEventHandler, Ref, forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";

export interface FieldSwitchProps extends Omit<FieldProps, "children"> {
  switchLabel?: string;
  className?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
}

export const FieldSwitch = forwardRef(function FieldSwitch(
  { onBlur, switchLabel, onFocus, onChange, className, value, ...rest }: FieldSwitchProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <Field {...rest}>
      <HeadlessSwitch.Group>
        <div className="flex items-center gap-3">
          <HeadlessSwitch
            checked={value || false}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              value ? "bg-spacePurple-500" : "bg-white/8",
              className
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-greyscale-50 transition",
                value ? "translate-x-6" : "translate-x-1"
              )}
            />
          </HeadlessSwitch>
          {switchLabel && (
            <HeadlessSwitch.Label className="text-sm text-spaceBlue-200">{switchLabel}</HeadlessSwitch.Label>
          )}
        </div>
      </HeadlessSwitch.Group>
    </Field>
  );
});

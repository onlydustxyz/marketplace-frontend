import { FC, FocusEventHandler } from "react";
import { FieldProps } from "./Field";
import { cn } from "src/utils/cn";
import CheckLine from "src/icons/CheckLine";

export interface FieldCheckboxProps extends Omit<FieldProps, "children"> {
  switchLabel?: string;
  className?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const FieldCheckbox: FC<FieldCheckboxProps> = ({ onBlur, onFocus, onChange, className, value, ...rest }) => {
  return (
    <div className="relative h-4 w-4">
      <input
        onBlur={onBlur}
        onFocus={onFocus}
        id={rest.name}
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
        className={cn(
          // "checked:focus:spacePurple-600 h-5 w-5 cursor-pointer rounded border border-greyscale-50/20 bg-white/8 accent-spacePurple-700 hover:bg-white/2",
          "bg-red checked:text-red peer h-full w-full cursor-pointer appearance-none rounded-[3px] border border-white/8 accent-spacePurple-500 checked:bg-spacePurple-500",
          className
        )}
      />
      <CheckLine className="pointer-events-none absolute left-1/2 top-1/2 hidden  -translate-x-1/2 -translate-y-1/2 text-xs  leading-3 text-white peer-checked:block" />
    </div>
  );
};

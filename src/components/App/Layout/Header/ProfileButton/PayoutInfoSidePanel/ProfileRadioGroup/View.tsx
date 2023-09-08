import { cn } from "src/utils/cn";
import { ReactElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

type Option = {
  value: string;
  label: string;
  icon?: ReactElement;
};

type PropsType = {
  label?: string;
  options: Option[];
  withMargin: boolean;
  register?: UseFormRegisterReturn;
  requiredForPayment: boolean;
};

export default function View({ label, options, withMargin, register, requiredForPayment }: PropsType) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  return (
    <label
      className={classNames("flex flex-col", {
        "gap-2": withMargin,
      })}
    >
      <div className="text-sm font-medium tracking-tight text-greyscale-300">
        {label}
        {requiredForPayment && <span className="pl-0.5 text-orange-500">{"*"}</span>}
      </div>
      <div className="flex flex-row items-center gap-2">
        {options.map(option => (
          <div className="flex" key={option.value}>
            <input type="radio" id={option.value} {...register} className="peer hidden" value={option.value} />
            <label
              data-testid={option.value}
              htmlFor={option.value}
              className={cn(
                "flex h-9 w-fit cursor-pointer select-none items-center gap-1 rounded-xl border border-greyscale-50/[0.08] px-3 py-2 text-sm font-normal text-neutral-100 peer-checked:border-spacePurple-500 peer-checked:bg-spacePurple-900 ",
                { "peer-checked:outline-double peer-checked:outline-1 peer-checked:outline-spacePurple-500": isXl }
              )}
            >
              {option.icon}
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </label>
  );
}

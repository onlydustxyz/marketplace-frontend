import { Switch } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TToggle } from "./toggle.types";

export function Toggle({ ariaLabel, onChange, value, name, disabled, reverse, children }: TToggle.Props) {
  const handleChange = (value: boolean) => {
    onChange(value);
  };

  return (
    // should a div to reset flex parents
    <div>
      <Switch
        isSelected={value}
        aria-label={ariaLabel}
        onValueChange={handleChange}
        name={name}
        isDisabled={disabled}
        className={cn({
          "flex-row-reverse": reverse,
        })}
        classNames={{
          wrapper: cn(
            "group-data-[selected=true]:bg-spacePurple-500 bg-card-background-heavy border-1 border-transparent group-data-[hover=true]:border-card-border-light group-data-[selected=true]:group-data-[hover=true]:border-spacePurple-800 !transition-all duration-300 ease-in",
            {
              "ml-2 mr-0": reverse,
            }
          ),
        }}
      >
        {children}
      </Switch>
    </div>
  );
}

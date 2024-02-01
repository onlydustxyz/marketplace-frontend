import { Switch } from "@nextui-org/react";

import { TToggle } from "./toggle.types";

export function Toggle({ ariaLabel, onChange, value, name, disabled }: TToggle.Props) {
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
        classNames={{
          wrapper:
            "group-data-[selected=true]:bg-spacePurple-500 border-1 border-transparent group-data-[hover=true]:border-card-border-light group-data-[selected=true]:group-data-[hover=true]:border-spacePurple-800 !transition-all duration-300 ease-in",
        }}
      />
    </div>
  );
}

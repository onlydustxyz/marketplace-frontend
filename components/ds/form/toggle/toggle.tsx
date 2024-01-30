import { TToggle } from "./toggle.types";
import { Switch } from "@nextui-org/react";

export function Toggle({ ariaLabel, onChange, value, name }: TToggle.Props) {
  const handleChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <div>
      <Switch
        isSelected={value}
        aria-label={ariaLabel}
        onValueChange={handleChange}
        name={name}
        classNames={{
          wrapper:
            "group-data-[selected=true]:bg-spacePurple-500 border-1 border-transparent group-data-[hover=true]:border-card-border-light group-data-[selected=true]:group-data-[hover=true]:border-spacePurple-800 !transition-all duration-300 ease-in",
        }}
      />
    </div>
  );
}

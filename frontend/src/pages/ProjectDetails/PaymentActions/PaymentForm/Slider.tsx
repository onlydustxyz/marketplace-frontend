import { Controller, Control } from "react-hook-form";
import { Inputs } from "./types";

interface SliderProps {
  control: Control<Inputs, any>;
  name: keyof Inputs;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  displayValue: (value: any) => string;
}

export default function Slider({ control, name, minValue, maxValue, defaultValue, displayValue }: SliderProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <>
          <input
            id="default-range"
            type="range"
            value={value}
            onChange={onChange}
            min={minValue}
            max={maxValue}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          {displayValue(value)}
        </>
      )}
    ></Controller>
  );
}

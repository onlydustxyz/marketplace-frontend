import { memo } from "react";
import { useFormContext, useFormState, RegisterOptions, Controller, Control } from "react-hook-form";
import { Inputs } from "./types";

interface SelectProps extends React.PropsWithChildren {
  label?: string;
  name: keyof Inputs;
  options?: RegisterOptions;
  control: Control<Inputs, any>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, control, children }) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <label html-for={name} className="flex flex-col flex-grow gap-3">
          <div className="font-bold">{label}</div>
          <select
            id={name}
            {...register(name, options)}
            className={error ? "border-2 border-rose-600" : "p-3"}
            value={value}
            onChange={onChange}
          >
            {children}
          </select>
          <span className="text-red-600 text-sm">{error?.message ? error.message.toString() : "\u00A0"}</span>
        </label>
      )}
    ></Controller>
  );
};

export default memo(Select);

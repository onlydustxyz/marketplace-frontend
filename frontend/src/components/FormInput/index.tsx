import { memo } from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";
import LoaderIcon from "src/assets/icons/Loader";

type PropsType = {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  loading?: boolean;
  options?: RegisterOptions;
  value?: string | number;
  onChange?: (value: any) => void;
};

const Input: React.FC<PropsType> = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  loading,
  options = {},
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const error = errors[name];

  return (
    <label html-for={name} className="flex flex-col flex-grow gap-3">
      <div className="font-medium text-neutral-300">{label}</div>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
        className={error ? "border-2 border-rose-600" : "p-3"}
        value={value}
        onChange={onChange}
      />
      {loading && <LoaderIcon className="flex animate-spin place-items-center" />}
      <span className="text-red-600 text-sm">{error?.message ? error.message.toString() : "\u00A0"}</span>
    </label>
  );
};

export default memo(Input);

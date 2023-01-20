import { ChangeEventHandler, memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import LoaderIcon from "src/assets/icons/Loader";

type PropsType = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  loading?: boolean;
  error?: {
    message?: string;
  };
  register?: UseFormRegisterReturn<string>;
  onChange?: ChangeEventHandler<any>;
};

const View: React.FC<PropsType> = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  loading,
  error,
  register,
  onChange,
}) => (
  <label html-for={name} className="flex flex-col flex-grow gap-2 text-greyscale-50 font-walsheim">
    <div className="font-medium text-sm">{label}</div>
    <div>
      <div className="relative flex items-center">
        <input
          key={name}
          id={name}
          placeholder={placeholder}
          type={type}
          className={`w-full bg-white/5 border border-greyscale-50/[0.08] rounded-xl font-walsheim font-normal text-base px-4 py-3 placeholder:text-greyscale-50/60 focus:placeholder:text-spacePurple-200/60 focus:outline-double focus:outline-spacePurple-500 focus:border-spacePurple-500 focus:bg-spacePurple-900
          ${error && "border outline-1 outline-rose-600 border-rose-600"}`}
          value={value}
          {...register}
          onChange={onChange}
        />
        {loading && <LoaderIcon className="flex animate-spin place-items-center absolute right-0 mr-3" />}
      </div>
      <span className="text-rose-600 text-sm ml-3">{error?.message ? error.message.toString() : "\u00A0"}</span>
    </div>
  </label>
);

export default memo(View);

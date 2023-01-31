import { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type PropsType = {
  label?: string;
  options: Option[];
  register?: UseFormRegisterReturn<any>;
};

export default function View({ label, options, register }: PropsType) {
  return (
    <label className="flex flex-col flex-grow gap-2 mb-6">
      <div className="font-medium text-sm text-greyscale-300 tracking-tight">{label}</div>
      <div className="flex flex-row items-center gap-2">
        {options.map(option => (
          <div className="flex" key={option.value}>
            <input type="radio" id={option.value} {...register} className="peer hidden" value={option.value} />
            <label
              data-testid={option.value}
              htmlFor={option.value}
              className="flex h-8 items-center cursor-pointer select-none border border-greyscale-50/[0.08] rounded-2xl py-2 px-3 text-sm font-normal text-neutral-100 peer-checked:bg-spacePurple-900 peer-checked:outline-double peer-checked:outline-spacePurple-500 peer-checked:outline-1 peer-checked:border-spacePurple-500"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </label>
  );
}

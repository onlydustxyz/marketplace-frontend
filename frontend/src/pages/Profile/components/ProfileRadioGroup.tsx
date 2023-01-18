import { useFormContext } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type PropsType = {
  name: string;
  label?: string;
  options: Option[];
};

const ProfileRadioGroup: React.FC<PropsType> = ({ name, label, options }) => {
  const { register } = useFormContext();
  return (
    <>
      <label className="flex flex-col flex-grow gap-3">
        <div className="font-medium text-neutral-300">{label}</div>
        <div className="flex flex-row items-center mb-4">
          {options.map(option => (
            <div className="flex" key={option.value}>
              <input type="radio" id={option.value} {...register(name)} className="peer hidden" value={option.value} />
              <div className="ml-px peer-checked:ml-0"></div>
              <label
                data-testid={option.value}
                htmlFor={option.value}
                className="block cursor-pointer select-none border border-neutral-600/90 rounded-2xl p-2 mr-2 text-center peer-checked:bg-purple-500/20 peer-checked:border-2 peer-checked:border-purple-500"
              >
                {option.label}
              </label>
              <div className="mr-px peer-checked:mr-0"></div>
            </div>
          ))}
        </div>
      </label>
    </>
  );
};

export default ProfileRadioGroup;

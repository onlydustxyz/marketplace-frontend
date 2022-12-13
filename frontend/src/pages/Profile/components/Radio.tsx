import { useFormContext } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type PropsType = {
  name: string;
  options: Option[];
};

const Radio: React.FC<PropsType> = ({ name, options }) => {
  const { register } = useFormContext();
  return (
    <>
      {options.map(option => (
        <label key={option.value} html-for={option.value}>
          <input type="radio" {...register(name)} id={option.value} value={option.value} className="mr-2" />
          {option.label}
        </label>
      ))}
    </>
  );
};

export default Radio;

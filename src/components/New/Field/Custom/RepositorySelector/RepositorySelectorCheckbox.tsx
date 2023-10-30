import { FC } from "react";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";

export interface FieldRepositoryCheckboxProps {
  id: number;
  checked: boolean;
}

export const FieldRepositoryCheckbox: FC<
  FieldRepositoryCheckboxProps & { onChange: (props: FieldRepositoryCheckboxProps) => void }
> = ({ id, checked, onChange }) => {
  const handleChange = (value: boolean) => {
    onChange({ id, checked: value });
  };

  return (
    <FieldCheckbox
      onChange={handleChange}
      value={checked}
      name={`repository-${id}`}
      fieldClassName={"inline-flex w-auto"}
    />
  );
};

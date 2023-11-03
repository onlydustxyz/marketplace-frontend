import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";

type IndividualFieldsProps = {
  isRequired: boolean;
};

export function IndividualFields({ isRequired }: IndividualFieldsProps) {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <Flex className="w-full flex-row gap-5">
      <Input
        label={T("profile.form.firstname")}
        placeholder={T("profile.form.firstname")}
        {...register("firstname")}
        showRequiredError={isRequired}
      />
      <Input
        label={T("profile.form.lastname")}
        placeholder={T("profile.form.lastname")}
        {...register("lastname")}
        showRequiredError={isRequired}
      />
    </Flex>
  );
}

import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";

export function IndividualFields() {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <Flex className="w-full flex-row gap-5">
      <Input
        label={T("profile.form.firstname")}
        placeholder={T("profile.form.firstname")}
        {...register("firstname")}
        requiredForPayment
      />
      <Input
        label={T("profile.form.lastname")}
        placeholder={T("profile.form.lastname")}
        {...register("lastname")}
        requiredForPayment
      />
    </Flex>
  );
}

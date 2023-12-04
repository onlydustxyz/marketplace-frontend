import { useFormContext } from "react-hook-form";
import Callout from "src/components/Callout";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";

type CompanyFieldsProps = {
  isRequired: boolean;
};

export function CompanyFields({ isRequired }: CompanyFieldsProps) {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <Flex className="flex-col">
      <Callout>{T("profile.form.companyNeedsInvoiceCallout")}</Callout>
      <div className="flex w-full flex-row gap-5 pt-5">
        <Input
          label={T("profile.form.companyName")}
          placeholder={T("profile.form.companyName")}
          {...register("companyName")}
          showRequiredError={isRequired}
        />
        <Input
          label={T("profile.form.identificationNumber")}
          placeholder={T("profile.form.identificationNumber")}
          {...register("companyIdentificationNumber")}
          showRequiredError={isRequired}
        />
      </div>
      <div className="flex w-full flex-row gap-5">
        <Input
          label={T("profile.form.companyOwnerFirstName")}
          placeholder={T("profile.form.companyOwnerFirstName")}
          {...register("firstname")}
          showRequiredError={isRequired}
        />
        <Input
          label={T("profile.form.companyOwnerLastName")}
          placeholder={T("profile.form.companyOwnerLastName")}
          {...register("lastname")}
          showRequiredError={isRequired}
        />
      </div>
    </Flex>
  );
}

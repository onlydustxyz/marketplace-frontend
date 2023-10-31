import { useFormContext } from "react-hook-form";
import Callout from "src/components/Callout";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";

export function CompanyFields() {
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
          requiredForPayment
        />
        <Input
          label={T("profile.form.identificationNumber")}
          placeholder={T("profile.form.identificationNumber")}
          {...register("companyIdentificationNumber")}
          requiredForPayment
        />
      </div>
      <div className="flex w-full flex-row gap-5">
        <Input
          label={T("profile.form.companyOwnerFirstName")}
          placeholder={T("profile.form.companyOwnerFirstName")}
          {...register("firstname")}
          requiredForPayment
        />
        <Input
          label={T("profile.form.companyOwnerLastName")}
          placeholder={T("profile.form.companyOwnerLastName")}
          {...register("lastname")}
          requiredForPayment
        />
      </div>
    </Flex>
  );
}

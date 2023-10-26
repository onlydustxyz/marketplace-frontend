import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import { ALPHABETICAL_VALIDATOR, ZIPCODE_VALIDATOR } from "src/utils/regex";

export function LocationFields() {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <>
      <Input
        label={T("profile.form.address")}
        placeholder={T("profile.form.address")}
        requiredForPayment={true}
        {...register("address", {
          required: { value: true, message: T("profile.form.payoutFieldRequired") },
        })}
      />
      <div className="flex flex-row gap-5">
        <Input
          withMargin={false}
          label={T("profile.form.postCode")}
          placeholder={T("profile.form.postCode")}
          {...register("postCode", {
            required: { value: true, message: T("profile.form.payoutFieldRequired") },
            pattern: { value: ZIPCODE_VALIDATOR, message: T("profile.form.invalidZipcode") },
          })}
        />
        <Input
          withMargin={false}
          label={T("profile.form.city")}
          placeholder={T("profile.form.city")}
          {...register("city", {
            required: true,
            pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
          })}
        />
        <Input
          withMargin={false}
          label={T("profile.form.country")}
          placeholder={T("profile.form.country")}
          {...register("country", {
            required: true,
            pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
          })}
        />
      </div>
    </>
  );
}

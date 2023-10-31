import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

export function LocationFields() {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <>
      <Input
        label={T("profile.form.address")}
        placeholder={T("profile.form.address")}
        {...register("address")}
        requiredForPayment
      />
      <div className="flex flex-row gap-5">
        <Input
          withMargin={false}
          label={T("profile.form.postCode")}
          placeholder={T("profile.form.postCode")}
          {...register("postCode")}
          requiredForPayment
        />
        <Input
          withMargin={false}
          label={T("profile.form.city")}
          placeholder={T("profile.form.city")}
          {...register("city")}
          requiredForPayment
        />
        <Input
          withMargin={false}
          label={T("profile.form.country")}
          placeholder={T("profile.form.country")}
          {...register("country")}
          requiredForPayment
        />
      </div>
    </>
  );
}

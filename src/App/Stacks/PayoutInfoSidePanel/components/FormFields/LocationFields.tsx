import { useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type LocationFieldsProps = {
  isRequired: boolean;
};

export function LocationFields({ isRequired }: LocationFieldsProps) {
  const { T } = useIntl();
  const { register } = useFormContext();

  return (
    <>
      <Input
        label={T("profile.form.address")}
        placeholder={T("profile.form.address")}
        {...register("address")}
        showRequiredError={isRequired}
      />
      <div className="flex flex-row gap-5">
        <Input
          withMargin={false}
          label={T("profile.form.postCode")}
          placeholder={T("profile.form.postCode")}
          {...register("postCode")}
          showRequiredError={isRequired}
        />
        <Input
          withMargin={false}
          label={T("profile.form.city")}
          placeholder={T("profile.form.city")}
          {...register("city")}
          showRequiredError={isRequired}
        />
        <Input
          withMargin={false}
          label={T("profile.form.country")}
          placeholder={T("profile.form.country")}
          {...register("country")}
          showRequiredError={isRequired}
        />
      </div>
    </>
  );
}

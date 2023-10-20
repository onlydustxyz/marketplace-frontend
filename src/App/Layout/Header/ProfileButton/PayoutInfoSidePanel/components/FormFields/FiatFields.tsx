import { Controller, useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import { BIC_REGEXP } from "src/utils/regex";
import IBANParser from "iban";

export function FiatFields() {
  const { T } = useIntl();
  const {
    watch,
    control,
    formState: { touchedFields },
    trigger,
    clearErrors,
  } = useFormContext();

  const [iban, bic] = watch(["iban", "bic"]);

  return (
    <Flex className="flex-row gap-5">
      <Controller
        control={control}
        name="iban"
        render={({ field: { onChange, value, onBlur } }) => {
          return (
            <Input
              withMargin={false}
              label={T("profile.form.iban")}
              name="iban"
              placeholder={T("profile.form.iban")}
              options={{
                required: { value: !!bic, message: T("profile.form.ibanRequired") },
                validate: value => {
                  return !value?.trim() || IBANParser.isValid(value) || T("profile.form.ibanInvalid");
                },
              }}
              requiredForPayment={true}
              value={value && IBANParser.printFormat(value)}
              onChange={onChange}
              onBlur={() => {
                if (touchedFields.BIC) {
                  trigger("bic");
                }
                onBlur();
              }}
              onFocus={() => clearErrors("iban")}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="bic"
        render={({ field: { onChange, value, onBlur } }) => {
          return (
            <Input
              withMargin={false}
              label={T("profile.form.bic")}
              name="bic"
              placeholder={T("profile.form.bic")}
              options={{
                pattern: { value: BIC_REGEXP, message: T("profile.form.bicInvalid") },
                required: {
                  value: !!iban?.trim(),
                  message: T("profile.form.bicRequired"),
                },
              }}
              requiredForPayment={true}
              value={value}
              onChange={onChange}
              onBlur={() => {
                if (touchedFields.IBAN) {
                  trigger("iban");
                }
                onBlur();
              }}
              onFocus={() => clearErrors("bic")}
            />
          );
        }}
      />
    </Flex>
  );
}

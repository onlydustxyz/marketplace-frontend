import { Controller, useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import { BIC_REGEXP } from "src/utils/regex";
import IBANParser from "iban";
import { RequiredFieldsType } from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel/usePayoutInfoValidation";

export function FiatFields({ requiredFields }: { requiredFields: RequiredFieldsType }) {
  const { T } = useIntl();
  const { watch, control, trigger, clearErrors } = useFormContext();
  const { missingSepaAccount } = requiredFields || {};
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
              showRequiredError={missingSepaAccount}
              value={value && IBANParser.printFormat(value)}
              onChange={onChange}
              onBlur={() => {
                trigger("bic");
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
                required: {
                  value: !!iban,
                  message: T("profile.form.bicRequired"),
                },
                pattern: { value: BIC_REGEXP, message: T("profile.form.bicInvalid") },
              }}
              showRequiredError={missingSepaAccount}
              value={value}
              onChange={onChange}
              onBlur={() => {
                trigger("iban");
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

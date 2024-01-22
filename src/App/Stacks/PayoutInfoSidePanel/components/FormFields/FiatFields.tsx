import { Controller, useFormContext } from "react-hook-form";
import Input from "src/components/FormInput";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import IBANParser from "iban";
import { RequiredFieldsType } from "src/App/Stacks/PayoutInfoSidePanel/usePayoutInfoValidation";
import CurrencyField from "./CurrencyField.tsx";
import { Currency } from "../../../../../types.ts";

export function FiatFields({ requiredFields }: { requiredFields: RequiredFieldsType }) {
  const { T } = useIntl();
  const { control, trigger, clearErrors, watch } = useFormContext();
  const { missingSepaAccount } = requiredFields || {};
  const [iban, bic] = watch(["iban", "bic"]);
  return (
    <CurrencyField currencies={[Currency.USD]}>
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
                  required: { value: !!value, message: T("profile.form.ibanRequired") },
                  validate: value => {
                    if (!value?.trim() && bic) {
                      return T("profile.form.ibanRequired");
                    }
                    return true;
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
                    value: !!value,
                    message: T("profile.form.bicRequired"),
                  },
                  validate: value => {
                    if (!value?.trim() && iban) {
                      return T("profile.form.ibanRequired");
                    }
                    return true;
                  },
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
    </CurrencyField>
  );
}

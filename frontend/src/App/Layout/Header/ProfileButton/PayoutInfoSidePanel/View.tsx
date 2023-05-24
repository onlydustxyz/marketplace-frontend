import classNames from "classnames";
import Button from "src/components/Button";
import { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import BuildingLine from "src/icons/BuildingLine";
import CheckLine from "src/icons/CheckLine";
import User3Line from "src/icons/User3Line";
import ProfileRadioGroup from "src/pages/Profile/components/ProfileRadioGroup";
import { PayoutSettingsDisplayType, ProfileType } from "./types";
import Callout from "src/components/Callout";
import Input from "src/components/FormInput";
import { Controller, useFormContext } from "react-hook-form";
import Card from "src/components/Card";
import BankLine from "src/icons/BankLine";
import BitcoinLine from "src/icons/BitcoinLine";
import IBANParser from "iban";
import LockFill from "src/icons/LockFill";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP =
  /(^0x[a-fA-F0-9]{40}$)|(^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$)/gi;
const BIC_REGEXP = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;

type Props = {
  payoutSettingsValid?: boolean;
  saveButtonDisabled: boolean;
};

export default function View({ payoutSettingsValid, saveButtonDisabled }: Props) {
  const { T } = useIntl();
  const {
    watch,
    control,
    formState: { touchedFields },
    clearErrors,
    trigger,
  } = useFormContext();

  const profileType = watch("profileType");
  const payoutSettingsType = watch("payoutSettingsType");
  const IBANValue = watch("IBAN");
  const BICValue = watch("BIC");

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6 m-6">
        <Tag size={TagSize.Medium}>
          <div
            className={classNames({
              "text-orange-500": !payoutSettingsValid,
            })}
          >
            {payoutSettingsValid ? (
              <div className="flex flex-row items-center gap-1">
                <CheckLine /> {T("profile.form.payoutSettingsValidTag")}
              </div>
            ) : (
              T("profile.form.payoutSettingsRequiredTag")
            )}
          </div>
        </Tag>
        <ProfileRadioGroup
          name="profileType"
          label={T("profile.form.profileType")}
          requiredForPayment={true}
          options={[
            {
              value: ProfileType.Individual,
              label: T("profile.form.profileTypeIndividual"),
              icon: <User3Line className="text-xl" />,
            },
            {
              value: ProfileType.Company,
              label: T("profile.form.profileTypeCompany"),
              icon: <BuildingLine className="text-xl" />,
            },
          ]}
        />
        <Card padded={false} className="p-6">
          {profileType === ProfileType.Company && (
            <div className="flex flex-col">
              <Callout>{T("profile.form.companyNeedsInvoiceCallout")}</Callout>
              <div className="flex flex-row gap-5 w-full pt-5">
                <Input
                  label={T("profile.form.companyName")}
                  name="companyName"
                  placeholder={T("profile.form.companyName")}
                  requiredForPayment={true}
                />
                <Input
                  label={T("profile.form.identificationNumber")}
                  name="identificationNumber"
                  placeholder={T("profile.form.identificationNumber")}
                  requiredForPayment={true}
                />
              </div>
              <div className="flex flex-row gap-5 w-full">
                <Input
                  label={T("profile.form.companyOwnerFirstName")}
                  name="firstname"
                  placeholder={T("profile.form.companyOwnerFirstName")}
                  requiredForPayment={true}
                />
                <Input
                  label={T("profile.form.companyOwnerLastName")}
                  name="lastname"
                  placeholder={T("profile.form.companyOwnerLastName")}
                  requiredForPayment={true}
                />
              </div>
            </div>
          )}
          {profileType === ProfileType.Individual && (
            <div className="flex flex-row gap-5 w-full">
              <Input
                label={T("profile.form.firstname")}
                name="firstname"
                placeholder={T("profile.form.firstname")}
                requiredForPayment={true}
              />
              <Input
                label={T("profile.form.lastname")}
                name="lastname"
                placeholder={T("profile.form.lastname")}
                requiredForPayment={true}
              />
            </div>
          )}
          <div>
            <Input
              label={T("profile.form.address")}
              name="address"
              placeholder={T("profile.form.address")}
              requiredForPayment={true}
            />
            <div className="flex flex-row gap-5">
              <Input
                label={T("profile.form.postCode")}
                name="postCode"
                placeholder={T("profile.form.postCode")}
                requiredForPayment={true}
              />
              <Input
                label={T("profile.form.city")}
                name="city"
                placeholder={T("profile.form.city")}
                requiredForPayment={true}
              />
              <Input
                label={T("profile.form.country")}
                name="country"
                placeholder={T("profile.form.country")}
                requiredForPayment={true}
              />
            </div>
          </div>
          {profileType === ProfileType.Company && (
            <div className="flex flex-row gap-3 font-medium text-neutral-300 w-fit mb-6">
              <ProfileRadioGroup
                name="payoutSettingsType"
                label={T("profile.form.payoutSettingsType")}
                requiredForPayment={true}
                options={[
                  {
                    value: PayoutSettingsDisplayType.BankAddress,
                    label: T("profile.form.bankWire"),
                    icon: <BankLine className="text-xl" />,
                  },
                  {
                    value: PayoutSettingsDisplayType.EthereumIdentity,
                    label: T("profile.form.cryptoWire"),
                    icon: <BitcoinLine className="text-xl" />,
                  },
                ]}
              />
            </div>
          )}
          {payoutSettingsType === PayoutSettingsDisplayType.EthereumIdentity && (
            <Input
              label={T("profile.form.ethIdentity")}
              name="ethIdentity"
              placeholder={T("profile.form.ethIdentityPlaceholder")}
              options={{
                pattern: {
                  value: ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP,
                  message: T("profile.form.invalidCryptoSettings"),
                },
              }}
              requiredForPayment={true}
            />
          )}
          {payoutSettingsType === PayoutSettingsDisplayType.BankAddress && (
            <div className="flex flex-row gap-5">
              <Controller
                control={control}
                name="IBAN"
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <Input
                      label={T("profile.form.iban")}
                      name="IBAN"
                      placeholder={T("profile.form.iban")}
                      options={{
                        required: { value: !!BICValue, message: T("profile.form.ibanRequired") },
                        validate: value => {
                          return !value?.trim() || IBANParser.isValid(value) || T("profile.form.ibanInvalid");
                        },
                      }}
                      requiredForPayment={true}
                      value={value && IBANParser.printFormat(value)}
                      onChange={onChange}
                      onBlur={() => {
                        if (touchedFields.BIC) {
                          trigger("BIC");
                        }
                        onBlur();
                      }}
                      onFocus={() => clearErrors("IBAN")}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="BIC"
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <Input
                      label={T("profile.form.bic")}
                      name="BIC"
                      placeholder={T("profile.form.bic")}
                      options={{
                        pattern: { value: BIC_REGEXP, message: T("profile.form.bicInvalid") },
                        required: {
                          value: !!IBANValue?.trim(),
                          message: T("profile.form.bicRequired"),
                        },
                      }}
                      requiredForPayment={true}
                      value={value}
                      onChange={onChange}
                      onBlur={() => {
                        if (touchedFields.IBAN) {
                          trigger("IBAN");
                        }
                        onBlur();
                      }}
                      onFocus={() => clearErrors("BIC")}
                    />
                  );
                }}
              />
            </div>
          )}
        </Card>
        <div className="flex flex-col gap-4 p-4 items-center text-center text-greyscale-400 font-walsheim">
          <div className="flex items-center justify-center bg-white/8 w-9 h-9 rounded-lg text-xl leading-5">
            <LockFill />
          </div>
          <ReactMarkdown className="whitespace-pre-wrap text-sm">{T("profile.form.privacyNotice")}</ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-row items-center grow-0 justify-between bg-white/2 border-t border-greyscale-50/8 px-8 py-5">
        <Tag size={TagSize.Medium}>
          <CheckLine />
          {T("profile.form.saveStatus.saved")}
        </Tag>
        <Button
          size={ButtonSize.Md}
          htmlType="submit"
          data-testid="profile-form-submit-button"
          disabled={saveButtonDisabled}
        >
          {T("profile.form.send")}
        </Button>
      </div>
    </div>
  );
}

import classNames from "classnames";
import Button from "src/components/Button";
import { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import BuildingLine from "src/icons/BuildingLine";
import CheckLine from "src/icons/CheckLine";
import User3Line from "src/icons/User3Line";
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
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import ProfileRadioGroup from "./ProfileRadioGroup";
import StarknetIcon from "src/assets/icons/Starknet";
import EthereumIcon from "src/assets/icons/Ethereum";
import OptimismIcon from "src/assets/icons/Optimism";
import AptosIcon from "src/assets/icons/Aptos";
import Chip from "src/components/Chip/Chip";
import Flex from "src/components/Utils/Flex";
import Box from "src/components/Utils/Box";
import {
  APTOS_WALLET,
  BIC_REGEXP,
  ETH_WALLET_OR_ENS_ADDRESS,
  OPTIMISM_WALLET,
  STARKNET_WALLET,
  ALPHABETICAL_VALIDATOR,
  ZIPCODE_VALIDATOR,
} from "src/utils/regex";
import ProfileContent from "./ProfileContent";

type Props = {
  isContactInfoValid?: boolean;
  isPaymentInfoValid?: boolean;
  payoutSettingsValid?: boolean;
  saveButtonDisabled: boolean;
  unsavedChanges: boolean;
};

export default function PayoutInfoSidePanel({
  isContactInfoValid,
  isPaymentInfoValid,
  saveButtonDisabled,
  unsavedChanges,
}: Props) {
  const { T } = useIntl();
  const {
    watch,
    control,
    formState: { touchedFields, isValid },
    clearErrors,
    trigger,
    register,
  } = useFormContext();

  const profileType = watch("profileType");
  const payoutSettingsType = watch("payoutSettingsType");
  const IBANValue = watch("IBAN");
  const BICValue = watch("BIC");

  return (
    <div className="flex h-full min-h-0 flex-col justify-between overflow-y-auto">
      <div className="mx-2 mb-1 flex min-h-0 flex-col gap-6 px-4 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <ProfileRadioGroup
          name="profileType"
          label={T("profile.form.profileType")}
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
        <Card padded={false} className="p-6" withBg={false}>
          <Box className="pb-6">
            <Tag size={TagSize.Medium}>
              <div
                className={classNames({
                  "text-orange-500": !isContactInfoValid,
                })}
              >
                {isContactInfoValid ? (
                  <div className="flex flex-row items-center gap-1">
                    <CheckLine /> {T("profile.form.contactSettingsValidTag")}
                  </div>
                ) : (
                  <>
                    <ErrorWarningLine className="mr-1 text-orange-500" />
                    {T("profile.missing.contact")}
                  </>
                )}
              </div>
            </Tag>
          </Box>

          {profileType === ProfileType.Company && (
            <div className="flex flex-col">
              <Callout>{T("profile.form.companyNeedsInvoiceCallout")}</Callout>
              <div className="flex w-full flex-row gap-5 pt-5">
                <Input
                  label={T("profile.form.companyName")}
                  placeholder={T("profile.form.companyName")}
                  {...register("companyName", {
                    required: { value: true, message: T("profile.form.payoutFieldRequired") },
                  })}
                />
                <Input
                  label={T("profile.form.identificationNumber")}
                  placeholder={T("profile.form.identificationNumber")}
                  {...register("identificationNumber", {
                    required: { value: true, message: T("profile.form.payoutFieldRequired") },
                  })}
                />
              </div>
              <div className="flex w-full flex-row gap-5">
                <Input
                  label={T("profile.form.companyOwnerFirstName")}
                  placeholder={T("profile.form.companyOwnerFirstName")}
                  {...register("firstname", {
                    required: { value: true, message: T("profile.form.payoutFieldRequired") },
                    pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
                  })}
                />
                <Input
                  label={T("profile.form.companyOwnerLastName")}
                  placeholder={T("profile.form.companyOwnerLastName")}
                  {...register("lastname", {
                    required: { value: true, message: T("profile.form.payoutFieldRequired") },
                    pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
                  })}
                />
              </div>
            </div>
          )}
          {profileType === ProfileType.Individual && (
            <div className="flex w-full flex-row gap-5">
              <Input
                label={T("profile.form.firstname")}
                placeholder={T("profile.form.firstname")}
                {...register("firstname", {
                  pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
                  required: { value: true, message: T("profile.form.payoutFieldRequired") },
                })}
              />
              <Input
                label={T("profile.form.lastname")}
                placeholder={T("profile.form.lastname")}
                {...register("lastname", {
                  pattern: { value: ALPHABETICAL_VALIDATOR, message: T("profile.form.alphabeticallyInvalid") },
                  required: { value: true, message: T("profile.form.payoutFieldRequired") },
                })}
              />
            </div>
          )}
          <div>
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
          </div>
        </Card>

        <Card padded={false} className="p-6" withBg={false}>
          <Box className="pb-6">
            <Tag size={TagSize.Medium}>
              <div
                className={classNames({
                  "text-orange-500": !isPaymentInfoValid,
                })}
              >
                {isPaymentInfoValid ? (
                  <div className="flex flex-row items-center gap-1">
                    <CheckLine /> {T("profile.form.payoutSettingsValidTag")}
                  </div>
                ) : (
                  <>
                    <ErrorWarningLine className="mr-1 text-orange-500" />
                    {T("profile.missing.payment")}
                  </>
                )}
              </div>
            </Tag>
          </Box>

          <ProfileContent title={T("profile.form.payoutSettingsType")} isCard={profileType === ProfileType.Company}>
            {profileType === ProfileType.Company && (
              <div className="mb-6 flex w-fit flex-row gap-3 font-medium text-neutral-300">
                <ProfileRadioGroup
                  name="payoutSettingsType"
                  withMargin={false}
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

            {payoutSettingsType === PayoutSettingsDisplayType.BankAddress && (
              <div className="flex flex-row gap-5">
                <Controller
                  control={control}
                  name="IBAN"
                  render={({ field: { onChange, value, onBlur } }) => {
                    return (
                      <Input
                        withMargin={false}
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
                        withMargin={false}
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

            {payoutSettingsType === PayoutSettingsDisplayType.EthereumIdentity && (
              <Input
                withMargin={profileType === ProfileType.Individual}
                label={
                  <Flex className="items-center gap-1">
                    <Chip content={<EthereumIcon className="h-3" />} />
                    {T("profile.form.ethIdentity")}
                  </Flex>
                }
                placeholder={T("profile.form.ethIdentityPlaceholder")}
                {...register("ethWallet", {
                  pattern: {
                    value: ETH_WALLET_OR_ENS_ADDRESS,
                    message: T("profile.form.invalidEthWallet"),
                  },
                })}
              />
            )}
          </ProfileContent>

          <ProfileContent title={T("profile.form.payoutCurrenciesType")} isCard={profileType === ProfileType.Company}>
            <Input
              label={
                <Flex className="items-center gap-1">
                  <Chip content={<StarknetIcon className="h-4" />} />
                  {T("profile.form.starkIdentity")}
                </Flex>
              }
              placeholder={T("profile.form.starkIdentityPlaceholder")}
              {...register("starknetWallet", {
                pattern: {
                  value: STARKNET_WALLET,
                  message: T("profile.form.invalidStarknetWallet"),
                },
              })}
            />
            <Input
              label={
                <Flex className="items-center gap-1">
                  <Chip content={<OptimismIcon className="h-4" />} />
                  {T("profile.form.optimismIdentity")}
                </Flex>
              }
              placeholder={T("profile.form.optimismIdentityPlaceholder")}
              {...register("optimismWallet", {
                pattern: {
                  value: OPTIMISM_WALLET,
                  message: T("profile.form.invalidOptimismWallet"),
                },
              })}
            />
            <Input
              label={
                <Flex className="items-center gap-1">
                  <Chip content={<AptosIcon className="h-4 bg-white" />} />
                  {T("profile.form.aptosIdentity")}
                </Flex>
              }
              placeholder={T("profile.form.aptosIdentityPlaceholder")}
              {...register("aptosWallet", {
                pattern: {
                  value: APTOS_WALLET,
                  message: T("profile.form.invalidAptosWallet"),
                },
              })}
            />
          </ProfileContent>
        </Card>

        <div className="flex flex-col items-center gap-4 p-4 text-center font-walsheim text-greyscale-400">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 text-xl leading-5">
            <LockFill />
          </div>
          <ReactMarkdown className="whitespace-pre-wrap text-sm">{T("profile.form.privacyNotice")}</ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between border-t border-greyscale-50/8 bg-white/2 px-8 py-5">
        <Tag size={TagSize.Medium}>
          {unsavedChanges ? (
            <div className="flex flex-row items-center gap-1 text-spacePurple-300">
              <ErrorWarningLine /> {T("profile.form.saveStatus.unsaved")}
            </div>
          ) : (
            <>
              <CheckLine />
              {T("profile.form.saveStatus.saved")}
            </>
          )}
        </Tag>
        <Button
          size={ButtonSize.Md}
          htmlType="submit"
          data-testid="profile-form-submit-button"
          disabled={!isValid || saveButtonDisabled}
        >
          {T("profile.form.send")}
        </Button>
      </div>
    </div>
  );
}

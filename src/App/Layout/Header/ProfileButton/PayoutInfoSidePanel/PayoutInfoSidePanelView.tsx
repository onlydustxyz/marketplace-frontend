import { cn } from "src/utils/cn";
import Button from "src/components/Button";
import { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import BuildingLine from "src/icons/BuildingLine";
import CheckLine from "src/icons/CheckLine";
import User3Line from "src/icons/User3Line";
import { ProfileType } from "./types";
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
import { PreferredMethod } from "src/__generated/graphql";
import { Chip } from "src/components/Chip/Chip";
import Center from "src/components/Utils/Center";

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

  const [profileType, usdPreferredMethod, iban, bic] = watch(["profileType", "usdPreferredMethod", "iban", "bic"]);

  return (
    <Flex className="h-full min-h-0 flex-col justify-between overflow-y-auto">
      <Flex className="mx-2 mb-1 min-h-0 flex-col gap-6 px-4 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
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
                className={cn({
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

          {profileType === ProfileType.Company ? (
            <Flex className="flex-col">
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
                  {...register("companyIdentificationNumber", {
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
            </Flex>
          ) : null}

          {profileType === ProfileType.Individual ? (
            <Flex className="w-full flex-row gap-5">
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
            </Flex>
          ) : null}

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
        </Card>

        <Card padded={false} className="p-6" withBg={false}>
          <Box className="pb-6">
            <Tag size={TagSize.Medium}>
              <Box
                className={cn({
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
              </Box>
            </Tag>
          </Box>

          <ProfileContent title={T("profile.form.payoutSettingsType")} isCard={profileType === ProfileType.Company}>
            {profileType === ProfileType.Company && (
              <Flex className="mb-4 w-fit flex-row gap-3 font-medium text-neutral-300">
                <ProfileRadioGroup
                  name="usdPreferredMethod"
                  withMargin={false}
                  options={[
                    {
                      value: PreferredMethod.Fiat,
                      label: T("profile.form.bankWire"),
                      icon: <BankLine className="text-xl" />,
                    },
                    {
                      value: PreferredMethod.Crypto,
                      label: T("profile.form.cryptoWire"),
                      icon: <BitcoinLine className="text-xl" />,
                    },
                  ]}
                />
              </Flex>
            )}

            {usdPreferredMethod === PreferredMethod.Fiat && profileType === ProfileType.Company && (
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
            )}

            {(usdPreferredMethod === PreferredMethod.Crypto || profileType === ProfileType.Individual) && (
              <Input
                withMargin={profileType === ProfileType.Individual}
                label={
                  <Flex className="items-center gap-1">
                    <Chip>
                      <EthereumIcon className="h-3" />
                    </Chip>
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
                  <Chip>
                    <StarknetIcon className="h-4" />
                  </Chip>
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
                  <Chip>
                    <OptimismIcon className="h-4" />
                  </Chip>
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
                  <Chip>
                    <AptosIcon className="h-4 bg-white" />
                  </Chip>
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

        <Flex className="flex-col items-center gap-4 p-4 text-center font-walsheim text-greyscale-400">
          <Center className="h-9 w-9 rounded-lg bg-white/8 text-xl leading-5">
            <LockFill />
          </Center>
          <ReactMarkdown className="whitespace-pre-wrap text-sm">{T("profile.form.privacyNotice")}</ReactMarkdown>
        </Flex>
      </Flex>
      <Flex className="flex-row items-center justify-between border-t border-greyscale-50/8 bg-white/2 px-8 py-5">
        <Tag size={TagSize.Medium}>
          {unsavedChanges ? (
            <Flex className="flex-row items-center gap-1 text-spacePurple-300">
              <ErrorWarningLine /> {T("profile.form.saveStatus.unsaved")}
            </Flex>
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
      </Flex>
    </Flex>
  );
}

import { useFormContext } from "react-hook-form";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PreferredMethod } from "src/__generated/graphql";
import EthereumIcon from "src/assets/icons/Ethereum";
import Button, { ButtonSize } from "src/components/Button";
import Card from "src/components/Card";
import { Chip } from "src/components/Chip/Chip";
import Input from "src/components/FormInput";
import Tag, { TagSize } from "src/components/Tag";
import Center from "src/components/Utils/Center";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import BankLine from "src/icons/BankLine";
import BitcoinLine from "src/icons/BitcoinLine";
import BuildingLine from "src/icons/BuildingLine";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import LockFill from "src/icons/LockFill";
import User3Line from "src/icons/User3Line";
import { ETH_WALLET_OR_ENS_ADDRESS } from "src/utils/regex";
import { CompanyFields } from "./components/FormFields/CompanyFields";
import { FiatFields } from "./components/FormFields/FiatFields";
import { IndividualFields } from "./components/FormFields/IndividualFields";
import { LocationFields } from "./components/FormFields/LocationFields";
import { OtherCryptoFields } from "./components/FormFields/OtherCryptoFields";
import ProfileContent from "./components/ProfileContent";
import ProfileRadioGroup from "./components/ProfileRadioGroup/ProfileRadioGroup";
import { StatusTag, StatusType } from "./components/StatusTag";
import { ProfileType } from "./types";

type Props = {
  payoutSettingsValid?: boolean;
  saveButtonDisabled: boolean;
  unsavedChanges: boolean;
};

export default function PayoutInfoSidePanel({ saveButtonDisabled, unsavedChanges }: Props) {
  const { T } = useIntl();
  const {
    watch,
    register,
    formState: { isValid },
  } = useFormContext();

  const [profileType, usdPreferredMethod, hasValidContactInfo, hasValidPayoutSettings] = watch([
    "profileType",
    "usdPreferredMethod",
    "hasValidContactInfo",
    "hasValidPayoutSettings",
  ]);

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
          <StatusTag isValid={hasValidContactInfo} type={StatusType.Contact} />

          {profileType === ProfileType.Company ? <CompanyFields /> : null}
          {profileType === ProfileType.Individual ? <IndividualFields /> : null}
          <LocationFields />
        </Card>

        <Card padded={false} className="p-6" withBg={false}>
          <StatusTag isValid={hasValidPayoutSettings} type={StatusType.Payment} />

          <ProfileContent title={T("profile.form.payoutSettingsType")} isCard={profileType === ProfileType.Company}>
            {profileType === ProfileType.Company && (
              <Flex className="mb-4 w-fit flex-row gap-3 font-medium text-neutral-300">
                <ProfileRadioGroup
                  name="usdPreferredMethod"
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

            {usdPreferredMethod === PreferredMethod.Fiat && profileType === ProfileType.Company && <FiatFields />}

            {usdPreferredMethod === PreferredMethod.Crypto && profileType === ProfileType.Company && (
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
            <OtherCryptoFields
              isEtherDisabled={usdPreferredMethod === PreferredMethod.Crypto && profileType === ProfileType.Company}
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

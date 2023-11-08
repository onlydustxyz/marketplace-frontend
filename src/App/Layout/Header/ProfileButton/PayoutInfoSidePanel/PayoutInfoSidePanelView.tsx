import { useFormContext } from "react-hook-form";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Button, { ButtonSize } from "src/components/Button";
import Card from "src/components/Card";
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
import { CompanyFields } from "./components/FormFields/CompanyFields";
import { FiatFields } from "./components/FormFields/FiatFields";
import { IndividualFields } from "./components/FormFields/IndividualFields";
import { LocationFields } from "./components/FormFields/LocationFields";
import { OtherCryptoFields } from "./components/FormFields/OtherCryptoFields";
import ProfileContent from "./components/ProfileContent";
import ProfileRadioGroup from "./components/ProfileRadioGroup/ProfileRadioGroup";
import { StatusTag, StatusType } from "./components/StatusTag";
import { ProfileType } from "./types";
import { RequiredFieldsType } from "./usePayoutInfoValidation";
import { PreferredMethod } from "src/types";

type Props = {
  payoutSettingsValid?: boolean;
  saveButtonDisabled: boolean;
  unsavedChanges: boolean;
  isContactInfoValid: boolean;
  isPaymentInfoValid: boolean;
  isContactInfoComplete: boolean;
  isPayoutInfoComplete: boolean;
  requiredFields: RequiredFieldsType;
};

export default function PayoutInfoSidePanel({
  saveButtonDisabled,
  unsavedChanges,
  isContactInfoValid,
  isPaymentInfoValid,
  isContactInfoComplete,
  isPayoutInfoComplete,
  requiredFields,
}: Props) {
  const { T } = useIntl();
  const {
    watch,
    formState: { isValid },
  } = useFormContext();

  const [profileType, usdPreferredMethod] = watch(["profileType", "usdPreferredMethod"]);
  const shouldDisplayContactStatus =
    (isContactInfoValid && isContactInfoComplete) || (!isContactInfoValid && !isContactInfoComplete);
  const shouldDisplayPayoutStatus =
    (isPaymentInfoValid && isPayoutInfoComplete) || (!isPaymentInfoValid && !isPayoutInfoComplete);

  const isFiat = usdPreferredMethod === PreferredMethod.Fiat && profileType === ProfileType.Company;

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
          {shouldDisplayContactStatus ? (
            <StatusTag isValid={isContactInfoValid && isContactInfoComplete} type={StatusType.Contact} />
          ) : null}

          {profileType === ProfileType.Company ? <CompanyFields isRequired={!isContactInfoValid} /> : null}
          {profileType === ProfileType.Individual ? <IndividualFields isRequired={!isContactInfoValid} /> : null}
          <LocationFields isRequired={!isContactInfoValid} />
        </Card>

        <Card padded={false} className="p-6" withBg={false}>
          {shouldDisplayPayoutStatus ? (
            <StatusTag
              isValid={isPaymentInfoValid && isPayoutInfoComplete}
              requiredNetworks={requiredFields}
              type={StatusType.Payment}
              isFiat={isFiat}
              isBankWire={usdPreferredMethod === PreferredMethod.Fiat}
              isCompany={profileType === ProfileType.Company}
            />
          ) : null}

          {profileType === ProfileType.Company && (
            <Flex className="mb-6 w-fit flex-row gap-3 font-medium text-neutral-300">
              <ProfileRadioGroup
                label={T("profile.form.usdPreferredMethod")}
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

          {isFiat && (
            <div className="mb-6">
              <FiatFields {...{ requiredFields }} />
            </div>
          )}

          <ProfileContent title={T("profile.form.payoutCurrenciesType")}>
            <OtherCryptoFields {...{ requiredFields }} />
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

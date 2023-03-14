import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form";
import IBAN from "iban";

import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import ProfileRadioGroup from "./ProfileRadioGroup";
import { useIntl } from "src/hooks/useIntl";
import {
  IdentityType,
  PayoutSettingsType,
  UserInfo,
  UpdateProfileInfoMutationVariables,
} from "src/__generated/graphql";
import Card from "src/components/Card";
import { useShowToaster } from "src/hooks/useToaster";
import { useEffect } from "react";
import Callout from "src/components/Callout";
import BankLine from "src/icons/BankLine";
import BitcoinLine from "src/icons/BitcoinLine";
import Tag, { TagSize } from "src/components/Tag";
import classNames from "classnames";
import CheckLine from "src/icons/CheckLine";
import BuildingLine from "src/icons/BuildingLine";
import User3Line from "src/icons/User3Line";
import MailLine from "src/icons/MailLine";
import TwitterFill from "src/icons/TwitterFill";
import DiscordFill from "src/icons/DiscordFill";
import { useAuth } from "src/hooks/useAuth";
import Telegram from "src/assets/icons/Telegram";

const ENS_DOMAIN_REGEXP = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;
const ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP =
  /(^0x[a-fA-F0-9]{40}$)|(^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$)/gi;
const EMAIL_ADDRESS_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const BIC_REGEXP = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;

type Inputs = {
  profileType: ProfileType;
  firstname?: string;
  lastname?: string;
  companyName?: string;
  identificationNumber?: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsDisplayType;
  ethIdentity?: string;
  IBAN?: string;
  BIC?: string;
  email?: string | null;
  telegram?: string | null;
  discord?: string | null;
  twitter?: string | null;
};

type PropsType = {
  user?: UserInfo | null;
  setSaveButtonDisabled: (disabled: boolean) => void;
  payoutSettingsValid: boolean | null | undefined;
  onUserProfileUpdated: () => void;
};

enum PayoutSettingsDisplayType {
  BankAddress = "BANK_ADDRESS",
  EthereumIdentity = "ETHEREUM_IDENTITY",
}

enum ProfileType {
  Company = "COMPANY",
  Individual = "INDIVIDUAL",
}

const ProfileForm: React.FC<PropsType> = ({
  user,
  setSaveButtonDisabled,
  payoutSettingsValid,
  onUserProfileUpdated,
}) => {
  const { githubEmail } = useAuth();
  const formMethods = useForm<Inputs>({
    defaultValues: {
      profileType: user?.identity?.Company ? ProfileType.Company : ProfileType.Individual,
      firstname: user?.identity?.Company
        ? user?.identity?.Company?.owner?.firstname
        : user?.identity?.Person?.firstname,
      lastname: user?.identity?.Company ? user?.identity?.Company?.owner?.lastname : user?.identity?.Person?.lastname,
      companyName: user?.identity?.Company?.name,
      identificationNumber: user?.identity?.Company?.identification_number,
      address: user?.location?.address,
      postCode: user?.location?.post_code,
      city: user?.location?.city,
      country: user?.location?.country,
      payoutSettingsType: user?.payoutSettings?.EthTransfer?.Address
        ? PayoutSettingsDisplayType.EthereumIdentity
        : user?.payoutSettings?.EthTransfer?.Domain
        ? PayoutSettingsDisplayType.EthereumIdentity
        : user?.payoutSettings?.WireTransfer
        ? PayoutSettingsDisplayType.BankAddress
        : PayoutSettingsDisplayType.EthereumIdentity,
      ethIdentity: user?.payoutSettings?.EthTransfer?.Address || user?.payoutSettings?.EthTransfer?.Name,
      IBAN: user?.payoutSettings?.WireTransfer?.IBAN,
      BIC: user?.payoutSettings?.WireTransfer?.BIC,
      email: user?.contactInformation?.email || githubEmail,
      telegram: user?.contactInformation?.telegram,
      discord: user?.contactInformation?.discord,
      twitter: user?.contactInformation?.twitter,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { touchedFields },
    clearErrors,
    trigger,
    setValue,
  } = formMethods;
  const showToaster = useShowToaster();

  const [updateUser, { loading }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser, {
    context: {
      graphqlErrorDisplay: "toaster",
    },
    onCompleted: () => {
      showToaster(T("profile.form.success"));
      onUserProfileUpdated();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = formData => {
    updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = watch("payoutSettingsType");
  const profileType = watch("profileType");
  const IBANValue = watch("IBAN");
  const BICValue = watch("BIC");
  const email = watch("email");
  const discord = watch("discord");
  const telegram = watch("telegram");
  const twitter = watch("twitter");

  useEffect(() => setSaveButtonDisabled(loading), [loading]);
  useEffect(() => {
    if (profileType === ProfileType.Individual) {
      setValue("payoutSettingsType", PayoutSettingsDisplayType.EthereumIdentity);
    }
  }, [profileType]);

  const { T } = useIntl();

  return (
    <FormProvider {...formMethods}>
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-row gap-6 items-stretch">
          <Card className="basis-1/2 p-8 pb-3" padded={false}>
            <div>
              <div className="flex flex-col gap-2 divide-y divide-solid divide-neutral-600 ">
                <div className="flex flex-row justify-between items-center">
                  <div className="font-medium text-lg">{T("profile.form.payoutInformation")}</div>
                  <div>
                    <Tag size={TagSize.Medium}>
                      <span
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
                      </span>
                    </Tag>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-3 font-medium text-neutral-300 mt-5 w-fit">
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
                  </div>
                  <div className="flex flex-col">
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
                  </div>
                </div>
              </div>
            </div>
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
              <div className="flex flex-row gap-3 font-medium text-neutral-300 w-fit">
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
                            return !value?.trim() || IBAN.isValid(value) || T("profile.form.ibanInvalid");
                          },
                        }}
                        requiredForPayment={true}
                        value={value && IBAN.printFormat(value)}
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
          <Card className="basis-1/2 p-8" padded={false}>
            <div className="flex flex-col gap-2 divide-y divide-solid divide-neutral-600 ">
              <div className="font-medium text-lg mb-px">{T("profile.form.contactInfo")}</div>
              <div className="flex flex-col pt-5">
                <Input
                  label={T("profile.form.email")}
                  name="email"
                  options={{ pattern: EMAIL_ADDRESS_REGEXP }}
                  placeholder={T("profile.form.emailPlaceholder")}
                  onFocus={() => clearErrors("email")}
                  inputClassName="pl-12"
                  prefixComponent={
                    <div className={`text-xl mt-1 pl-1 ${email && email.length > 0 && " text-white"}`}>
                      <MailLine />
                    </div>
                  }
                />
                <Input
                  label={T("profile.form.telegram")}
                  name="telegram"
                  placeholder={T("profile.form.telegramPlaceholder")}
                  inputClassName="pl-12"
                  prefixComponent={
                    <div className="pl-1">
                      <Telegram className={telegram && telegram.length > 0 ? "fill-white" : ""} size={19} />
                    </div>
                  }
                />
                <Input
                  label={T("profile.form.twitter")}
                  name="twitter"
                  placeholder={T("profile.form.twitterPlaceholder")}
                  inputClassName="pl-12"
                  prefixComponent={
                    <div className={`text-xl mt-1 pl-1 ${twitter && twitter.length > 0 && " text-white"}`}>
                      <TwitterFill />
                    </div>
                  }
                />
                <Input
                  label={T("profile.form.discord")}
                  name="discord"
                  placeholder={T("profile.form.discordPlaceholder")}
                  inputClassName="pl-12"
                  prefixComponent={
                    <div className={`text-xl mt-1 pl-1 ${discord && discord.length > 0 && "text-white"}`}>
                      <DiscordFill />
                    </div>
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export const UPDATE_USER_MUTATION = gql`
  mutation updateProfileInfo(
    $contactInformation: ContactInformation
    $identity: IdentityInput
    $location: Location
    $payoutSettings: PayoutSettingsInput
  ) {
    updateProfileInfo(
      identity: $identity
      location: $location
      payoutSettings: $payoutSettings
      contactInformation: $contactInformation
    )
  }
`;

const mapFormDataToSchema = ({
  profileType,
  lastname,
  firstname,
  address,
  companyName,
  city,
  country,
  postCode,
  payoutSettingsType,
  ethIdentity,
  IBAN,
  BIC,
  identificationNumber,
  email,
  telegram,
  discord,
  twitter,
}: Inputs) => {
  const variables: UpdateProfileInfoMutationVariables = {
    contactInformation: null,
    identity: null,
    location: null,
    payoutSettings: null,
  };

  if (email || telegram || discord || twitter) {
    variables.contactInformation = {
      email: email || null,
      telegram: telegram || null,
      discord: discord || null,
      twitter: twitter || null,
    };
  }

  if (profileType === ProfileType.Individual && (firstname || lastname)) {
    variables.identity = {
      type: IdentityType.Person,
      optPerson: {
        firstname: firstname || null,
        lastname: lastname || null,
      },
      optCompany: null,
    };
  }
  if (profileType === ProfileType.Company && (firstname || lastname || companyName || identificationNumber)) {
    variables.identity = {
      type: IdentityType.Company,
      optCompany: {
        name: companyName || null,
        identificationNumber: identificationNumber || null,
        owner: {
          firstname: firstname || null,
          lastname: lastname || null,
        },
      },
      optPerson: null,
    };
  }

  if (address || postCode || city || country) {
    variables.location = {
      address: address || null,
      postCode: postCode || null,
      city: city || null,
      country: country || null,
    };
  }

  const payoutType =
    payoutSettingsType === PayoutSettingsDisplayType.BankAddress
      ? PayoutSettingsType.BankAddress
      : ethIdentity?.match(ENS_DOMAIN_REGEXP)
      ? PayoutSettingsType.EthereumName
      : PayoutSettingsType.EthereumAddress;

  if (payoutType === PayoutSettingsType.EthereumAddress && ethIdentity) {
    variables.payoutSettings = {
      optEthAddress: ethIdentity,
      optBankAddress: null,
      optEthName: null,
      type: PayoutSettingsType.EthereumAddress,
    };
  }
  if (payoutType === PayoutSettingsType.EthereumName && ethIdentity) {
    variables.payoutSettings = {
      optEthAddress: null,
      optBankAddress: null,
      optEthName: ethIdentity,
      type: PayoutSettingsType.EthereumName,
    };
  }
  if (payoutType === PayoutSettingsType.BankAddress && IBAN && BIC) {
    variables.payoutSettings = {
      optEthAddress: null,
      optBankAddress: { IBAN, BIC },
      optEthName: null,
      type: PayoutSettingsType.BankAddress,
    };
  }

  return { variables };
};

export default ProfileForm;

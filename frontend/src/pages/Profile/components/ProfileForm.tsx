import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
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
import { RoutePaths } from "src/App";
import { useEffect } from "react";
import { useShowToaster } from "src/hooks/useToaster";
import FormToggle from "src/components/FormToggle";

const ENS_DOMAIN_REGEXP = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;
const ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP =
  /(^0x[a-fA-F0-9]{40}$)|(^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$)/gi;
const EMAIL_ADDRESS_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const BIC_REGEXP = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;

type Inputs = {
  isCompanyProfile: boolean;
  firstname?: string;
  lastname?: string;
  companyName?: string;
  email?: string | null;
  address: string;
  postCode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsDisplayType;
  ethIdentity?: string;
  IBAN?: string;
  BIC?: string;
};

type PropsType = {
  user?: UserInfo;
};

enum PayoutSettingsDisplayType {
  BankAddress = "BANK_ADDRESS",
  EthereumIdentity = "ETHEREUM_IDENTITY",
}

const ProfileForm: React.FC<PropsType> = ({ user }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      isCompanyProfile: user?.identity?.Company,
      firstname: user?.identity?.Person?.firstname,
      lastname: user?.identity?.Person?.lastname,
      companyName: user?.identity?.Company?.name,
      email: user?.email,
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
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data, error }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser, {
    context: {
      graphqlErrorDisplay: "toaster",
    },
  });
  const success = !!data;
  const location = useLocation();
  const showToaster = useShowToaster();

  useEffect(() => {
    if (success) {
      showToaster(T("profile.form.success"));
    }
  }, [success, error]);

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = formMethods.watch("payoutSettingsType");
  const isCompanyProfile = formMethods.watch("isCompanyProfile");
  const IBANValue = formMethods.watch("IBAN");
  const BICValue = formMethods.watch("BIC");

  const { T } = useIntl();

  return (
    <FormProvider {...formMethods}>
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-row gap-6 items-stretch">
          <Card className="basis-1/2 p-8">
            <div className="flex flex-col">
              <div>
                <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                  <div className="flex flex-row justify-between">
                    <div className="font-medium text-lg">{T("profile.form.aboutYou")}</div>
                    <div className="flex flex-row items-center gap-2">
                      <FormToggle
                        name="isCompanyProfile"
                        label={T("profile.form.companyProfile")}
                        control={formMethods.control}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-5 pt-5">
                      {!isCompanyProfile && (
                        <>
                          <Input
                            label={T("profile.form.firstname")}
                            name="firstname"
                            placeholder={T("profile.form.firstname")}
                          />
                          <Input
                            label={T("profile.form.lastname")}
                            name="lastname"
                            placeholder={T("profile.form.lastname")}
                          />
                        </>
                      )}
                      {isCompanyProfile && (
                        <Input
                          label={T("profile.form.companyName")}
                          name="companyName"
                          placeholder={T("profile.form.companyName")}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                  <div className="font-medium text-lg">{T("profile.form.contactInfo")}</div>
                  <div className="pt-5">
                    <Input
                      label={T("profile.form.emailAddress")}
                      name="email"
                      options={{ pattern: EMAIL_ADDRESS_REGEXP }}
                      placeholder={T("profile.form.emailPlaceholder")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="basis-1/2 p-8">
            <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
              <div className="font-medium text-lg">{T("profile.form.location")}</div>
              <div>
                <div className="mt-5">
                  <Input label={T("profile.form.address")} name="address" placeholder={T("profile.form.address")} />
                  <div className="flex flex-row gap-5">
                    <Input
                      label={T("profile.form.postCode")}
                      name="postCode"
                      placeholder={T("profile.form.postCode")}
                    />
                    <Input label={T("profile.form.city")} name="city" placeholder={T("profile.form.city")} />
                    <Input label={T("profile.form.country")} name="country" placeholder={T("profile.form.country")} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600">
                <div className="font-medium text-lg">{T("profile.form.payoutSettings")}</div>
                <div>
                  <div className="flex flex-row gap-3 font-medium text-neutral-300 mt-5 w-fit">
                    <ProfileRadioGroup
                      name="payoutSettingsType"
                      label={T("profile.form.payoutSettingsType")}
                      options={[
                        {
                          value: PayoutSettingsDisplayType.BankAddress,
                          label: T("profile.form.bankWire"),
                        },
                        {
                          value: PayoutSettingsDisplayType.EthereumIdentity,
                          label: T("profile.form.cryptoWire"),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            {payoutSettingsType === PayoutSettingsDisplayType.EthereumIdentity && (
              <Input
                label={T("profile.form.ethIdentity")}
                name="ethIdentity"
                placeholder={T("profile.form.ethIdentityPlaceholder")}
                options={{ pattern: ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP }}
              />
            )}
            {payoutSettingsType === PayoutSettingsDisplayType.BankAddress && (
              <div className="flex flex-row gap-5">
                <Controller
                  control={formMethods.control}
                  name="IBAN"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Input
                        label={T("profile.form.iban")}
                        name="IBAN"
                        placeholder={T("profile.form.iban")}
                        options={{
                          required: { value: !!BICValue, message: T("form.required") },
                          validate: value => {
                            return !value?.trim() || IBAN.isValid(value);
                          },
                        }}
                        value={value && IBAN.printFormat(value)}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                <Controller
                  control={formMethods.control}
                  name="BIC"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Input
                        label={T("profile.form.bic")}
                        name="BIC"
                        placeholder={T("profile.form.bic")}
                        options={{
                          pattern: BIC_REGEXP,
                          required: { value: !!IBANValue?.trim(), message: T("form.required") },
                        }}
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </div>
            )}
          </Card>
        </div>
        {success && <Navigate to={location.state?.prev || RoutePaths.Projects} />}
      </form>
    </FormProvider>
  );
};

export const UPDATE_USER_MUTATION = gql`
  mutation updateProfileInfo(
    $email: Email
    $identity: IdentityInput
    $location: Location
    $payoutSettings: PayoutSettingsInput
  ) {
    updateProfileInfo(identity: $identity, location: $location, payoutSettings: $payoutSettings, email: $email)
  }
`;

const mapFormDataToSchema = ({
  email,
  lastname,
  firstname,
  address,
  companyName,
  city,
  country,
  isCompanyProfile,
  postCode,
  payoutSettingsType,
  ethIdentity,
  IBAN,
  BIC,
}: Inputs) => {
  const variables: UpdateProfileInfoMutationVariables = {
    email: email || null,
    identity: null,
    location: null,
    payoutSettings: null,
  };

  if (!isCompanyProfile && (firstname || lastname)) {
    variables.identity = {
      type: IdentityType.Person,
      optPerson: { firstname: firstname || null, lastname: lastname || null },
      optCompany: null,
    };
  }
  if (isCompanyProfile && companyName) {
    variables.identity = {
      type: IdentityType.Company,
      optPerson: null,
      optCompany: { name: companyName },
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

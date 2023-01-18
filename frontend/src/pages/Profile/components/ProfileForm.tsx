import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import IBAN from "iban";
import { Switch } from "@headlessui/react";

import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import ProfileRadioGroup from "./ProfileRadioGroup";
import { useIntl } from "src/hooks/useIntl";
import {
  IdentityType,
  PayoutSettingsType,
  UpdateProfileInfoMutationVariables,
  UserInfo,
  PayoutSettingsInput,
  Location,
  IdentityInput,
} from "src/__generated/graphql";
import Card from "src/components/Card";
import { RoutePaths } from "src/App";
import { useEffect } from "react";
import { useToaster } from "src/hooks/useToaster/useToaster";

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
  email: string;
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
      lastname: user?.identity.Person?.lastname,
      companyName: user?.identity?.Company?.name,
      email: user?.email,
      address: user?.location.address,
      postCode: user?.location.post_code,
      city: user?.location.city,
      country: user?.location.country,
      payoutSettingsType: user?.payoutSettings.EthTransfer?.Address
        ? PayoutSettingsDisplayType.EthereumIdentity
        : user?.payoutSettings.EthTransfer?.Domain
        ? PayoutSettingsDisplayType.EthereumIdentity
        : user?.payoutSettings.WireTransfer
        ? PayoutSettingsDisplayType.BankAddress
        : PayoutSettingsDisplayType.EthereumIdentity,
      ethIdentity: user?.payoutSettings.EthTransfer?.Address || user?.payoutSettings.EthTransfer?.Name,
      IBAN: user?.payoutSettings.WireTransfer?.IBAN,
      BIC: user?.payoutSettings.WireTransfer?.BIC,
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser);
  const success = !!data;
  const location = useLocation();
  const { showToaster } = useToaster();

  useEffect(() => {
    if (success) {
      showToaster(T("profile.form.success"));
    }
  }, [success]);

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = formMethods.watch("payoutSettingsType");
  const isCompanyProfile = formMethods.watch("isCompanyProfile");
  const { T } = useIntl();

  return (
    <FormProvider {...formMethods}>
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-row gap-3 items-stretch">
          <Card>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex flex-col gap-2 divide-y divide-solid divide-neutral-600 ">
                  <div className="flex flex-row justify-between">
                    <div className="font-medium text-lg">{T("profile.form.aboutYou")}</div>
                    <div className="flex flex-row items-center gap-2">
                      <Controller
                        name="isCompanyProfile"
                        control={formMethods.control}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Switch
                              checked={!!value}
                              onChange={onChange}
                              className={`flex ${
                                value ? "bg-fuchsia-500/90 justify-end" : "bg-gray-200 justify-start"
                              } h-6 w-10 items-center rounded-full p-1`}
                            >
                              <span className={`h-5 w-5 transform rounded-full bg-white transition`} />
                            </Switch>
                          );
                        }}
                      />
                      <div>Company profile</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-5 pt-3">
                      {!isCompanyProfile && (
                        <>
                          <Input
                            label={T("profile.form.firstname")}
                            name="firstname"
                            placeholder={T("profile.form.firstname")}
                            options={{ required: T("form.required") }}
                          />
                          <Input
                            label={T("profile.form.lastname")}
                            name="lastname"
                            placeholder={T("profile.form.lastname")}
                            options={{ required: T("form.required") }}
                          />
                        </>
                      )}
                      {isCompanyProfile && (
                        <Input
                          label={T("profile.form.companyName")}
                          name="companyName"
                          placeholder={T("profile.form.companyName")}
                          options={{ required: T("form.required") }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                  <div className="font-medium text-lg">{T("profile.form.contactInfo")}</div>
                  <div className="pt-3">
                    <Input
                      label={T("profile.form.emailAddress")}
                      name="email"
                      options={{ pattern: EMAIL_ADDRESS_REGEXP, required: T("form.required") }}
                      placeholder={T("profile.form.emailPlaceholder")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
              <div className="font-medium text-lg">{T("profile.form.location")}</div>
              <div>
                <div className="mt-3">
                  <Input
                    label={T("profile.form.address")}
                    name="address"
                    placeholder={T("profile.form.address")}
                    options={{ required: T("form.required") }}
                  />
                  <div className="flex flex-row gap-5">
                    <Input
                      label={T("profile.form.postCode")}
                      name="postCode"
                      placeholder={T("profile.form.postCode")}
                      options={{ required: T("form.required") }}
                    />
                    <Input
                      label={T("profile.form.city")}
                      name="city"
                      placeholder={T("profile.form.city")}
                      options={{ required: T("form.required") }}
                    />
                    <Input
                      label={T("profile.form.country")}
                      name="country"
                      placeholder={T("profile.form.country")}
                      options={{ required: T("form.required") }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                <div className="font-medium text-lg">{T("profile.form.payoutSettings")}</div>
                <div>
                  <div className="flex flex-row gap-3 font-medium text-neutral-300 mt-3">
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
                options={{ pattern: ETHEREUM_ADDRESS_OR_ENV_DOMAIN_REGEXP, required: T("form.required") }}
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
                        options={{ required: T("form.required"), validate: IBAN.isValid }}
                        value={value && IBAN.printFormat(value)}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                <Input
                  label={T("profile.form.bic")}
                  name="BIC"
                  placeholder={T("profile.form.bic")}
                  options={{ pattern: BIC_REGEXP, required: T("form.required") }}
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
    $email: Email!
    $identity: IdentityInput!
    $location: Location!
    $payoutSettings: PayoutSettingsInput!
  ) {
    updateProfileInfo(identity: $identity, location: $location, payoutSettings: $payoutSettings, email: $email)
  }
`;

const getPayoutType = (payoutSettingsType: PayoutSettingsDisplayType, ethIdentity: string | undefined) => {
  if (payoutSettingsType === PayoutSettingsDisplayType.BankAddress) {
    return PayoutSettingsType.BankAddress;
  }
  if (ethIdentity && ENS_DOMAIN_REGEXP.test(ethIdentity)) {
    return PayoutSettingsType.EthereumName;
  }
  return PayoutSettingsType.EthereumAddress;
};

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
  const identity: IdentityInput = {
    type: isCompanyProfile ? IdentityType.Company : IdentityType.Person,
    optPerson: !isCompanyProfile && lastname && firstname ? { lastname, firstname } : null,
    optCompany: isCompanyProfile && companyName ? { name: companyName } : null,
  };

  const location: Location = {
    address,
    postCode,
    city,
    country,
  };

  const payoutType = getPayoutType(payoutSettingsType, ethIdentity);

  const payoutSettings: PayoutSettingsInput = {
    type: payoutType,
    optEthAddress: payoutType === PayoutSettingsType.EthereumAddress ? ethIdentity : null,
    optBankAddress: payoutType === PayoutSettingsType.BankAddress && IBAN && BIC ? { IBAN, BIC } : null,
    optEthName: payoutType === PayoutSettingsType.EthereumName ? ethIdentity : null,
  };

  const variables: UpdateProfileInfoMutationVariables = { email, identity, location, payoutSettings };

  return {
    variables,
  };
};

export default ProfileForm;

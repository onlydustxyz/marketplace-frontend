import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import Radio from "./Radio";
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

const ETHEREUM_ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/gi;
const ENS_DOMAIN_REGEXP = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
const EMAIL_ADDRESS_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

type Inputs = {
  paymentReceiverType: IdentityType;
  firstname?: string;
  lastname?: string;
  id?: string;
  name?: string;
  email: string;
  number: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsType;
  ethWalletAddress?: string;
  ethName?: string;
  IBAN?: string;
  BIC?: string;
};

type PropsType = {
  user?: UserInfo;
};

const ProfileForm: React.FC<PropsType> = ({ user }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      paymentReceiverType: user?.identity.Person
        ? IdentityType.Person
        : user?.identity.Company
        ? IdentityType.Company
        : IdentityType.Person,
      firstname: user?.identity?.Person?.firstname,
      lastname: user?.identity.Person?.lastname,
      id: user?.identity?.Company?.id,
      name: user?.identity?.Company?.name,
      email: user?.email,
      number: user?.location.number,
      street: user?.location.street,
      postCode: user?.location.post_code,
      city: user?.location.city,
      country: user?.location.country,
      payoutSettingsType: user?.payoutSettings.EthTransfer?.Address
        ? PayoutSettingsType.EthereumAddress
        : user?.payoutSettings.EthTransfer?.Domain
        ? PayoutSettingsType.EthereumName
        : user?.payoutSettings.WireTransfer
        ? PayoutSettingsType.BankAddress
        : PayoutSettingsType.EthereumAddress,
      ethWalletAddress: user?.payoutSettings.EthTransfer?.Address,
      ethName: user?.payoutSettings.EthTransfer?.Name,
      IBAN: user?.payoutSettings.WireTransfer?.IBAN,
      BIC: user?.payoutSettings.WireTransfer?.BIC,
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data, loading }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser);
  const success = !!data;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = formMethods.watch("payoutSettingsType");
  const paymentReceiverType = formMethods.watch("paymentReceiverType");
  const { T } = useIntl();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-row gap-3 items-stretch">
          <Card>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                  <div className="font-medium text-lg">{T("profile.form.aboutYou")}</div>
                  <div>
                    {paymentReceiverType === IdentityType.Person && (
                      <div className="flex flex-row gap-5 pt-3">
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
                      </div>
                    )}
                    {paymentReceiverType === IdentityType.Company && (
                      <div className="flex flex-row gap-5">
                        <Input
                          label={T("profile.form.id")}
                          name="id"
                          placeholder={T("profile.form.id")}
                          options={{ required: T("form.required") }}
                        />
                        <Input
                          label={T("profile.form.name")}
                          name="name"
                          placeholder={T("profile.form.name")}
                          options={{ required: T("form.required") }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col font-medium text-neutral-300 gap-2">
                  <div>{T("profile.form.typeOfProfile")}</div>
                  <div className="flex flex-row gap-3">
                    <Radio
                      name="paymentReceiverType"
                      options={[
                        {
                          value: IdentityType.Person,
                          label: T("profile.form.individualProfile"),
                        },
                        {
                          value: IdentityType.Company,
                          label: T("profile.form.companyProfile"),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1 divide-y divide-solid divide-neutral-600 ">
                  <div className="font-medium text-lg">{T("profile.form.contactInfo")}</div>
                  <div className="pt-3">
                    <Input
                      label={T("profile.form.email")}
                      name="email"
                      options={{ pattern: EMAIL_ADDRESS_REGEXP, required: T("form.required") }}
                      placeholder={T("profile.form.email")}
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
                    label={T("profile.form.number")}
                    name="number"
                    placeholder={T("profile.form.number")}
                    options={{ required: T("form.required") }}
                  />
                  <Input
                    label={T("profile.form.street")}
                    name="street"
                    placeholder={T("profile.form.street")}
                    options={{ required: T("form.required") }}
                  />
                  <div className="flex flex-row gap-5">
                    <Input
                      name="postCode"
                      placeholder={T("profile.form.postCode")}
                      options={{ required: T("form.required") }}
                    />
                    <Input
                      name="city"
                      placeholder={T("profile.form.city")}
                      options={{ required: T("form.required") }}
                    />
                    <Input
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
                    <Radio
                      name="payoutSettingsType"
                      options={[
                        {
                          value: PayoutSettingsType.EthereumAddress,
                          label: T("profile.form.ethereum"),
                        },
                        {
                          value: PayoutSettingsType.EthereumName,
                          label: T("profile.form.ethName"),
                        },
                        {
                          value: PayoutSettingsType.BankAddress,
                          label: T("profile.form.bankWire"),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            {payoutSettingsType === PayoutSettingsType.EthereumAddress && (
              <Input
                name="ethWalletAddress"
                placeholder={T("profile.form.ethWalletAddress")}
                options={{ pattern: ETHEREUM_ADDRESS_REGEXP, required: T("form.required") }}
              />
            )}
            {payoutSettingsType === PayoutSettingsType.EthereumName && (
              <Input
                name="ethName"
                placeholder={T("profile.form.ethName")}
                options={{ pattern: ENS_DOMAIN_REGEXP, required: T("form.required") }}
              />
            )}
            {payoutSettingsType === PayoutSettingsType.BankAddress && (
              <div className="flex flex-row gap-5">
                <Input name="IBAN" placeholder={T("profile.form.iban")} options={{ required: T("form.required") }} />
                <Input name="BIC" placeholder={T("profile.form.bic")} options={{ required: T("form.required") }} />
              </div>
            )}
          </Card>
        </div>
        <div className="self-end">
          <button
            type="submit"
            className="self-start bg-neutral-50 text-xl text-black border-2 px-4 py-2 rounded-md font-medium"
          >
            {success ? T("state.success") : loading ? T("state.loading") : T("profile.form.send")}
          </button>
          {success && <Navigate to={RoutePaths.Projects} />}
        </div>
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

const mapFormDataToSchema = ({
  email,
  lastname,
  firstname,
  id,
  name,
  number,
  street,
  city,
  country,
  paymentReceiverType,
  postCode,
  payoutSettingsType,
  ethWalletAddress,
  ethName,
  IBAN,
  BIC,
}: Inputs) => {
  const identity: IdentityInput = {
    type: paymentReceiverType,
    optPerson: lastname && firstname ? { lastname, firstname } : null,
    optCompany: id && name ? { id, name } : null,
  };

  const location: Location = {
    number,
    street,
    postCode,
    city,
    country,
  };

  const payoutSettings: PayoutSettingsInput = {
    type: payoutSettingsType,
    optEthAddress: ethWalletAddress || null,
    optBankAddress: IBAN && BIC ? { IBAN, BIC } : null,
    optEthName: ethName || null,
  };

  const variables: UpdateProfileInfoMutationVariables = { email, identity, location, payoutSettings };

  return {
    variables,
  };
};

export default ProfileForm;

import { gql } from "@apollo/client";
import { HasuraUserRole, PaymentReceiverType, PayoutSettingsType, UserInfo } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import Radio from "./Radio";
import { useIntl } from "src/hooks/useIntl";

type Inputs = {
  paymentReceiverType: PaymentReceiverType;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsType;
  ethWalletAddress?: string;
  iban?: string;
  bic?: string;
};

type PropsType = {
  user: UserInfo;
};

const ProfileForm: React.FC<PropsType> = ({ user }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      paymentReceiverType: user.identity.Person ? PaymentReceiverType.INDIVIDUAL : user.identity.Company ? PaymentReceiverType.COMPANY : PaymentReceiverType.INDIVIDUAL,
      firstName: user.identity?.Person?.firstname ?? "",
      lastName: user.identity.Person?.lastname ?? "",
      email: user.email ?? "",
      number: user.location.number ?? "",
      street: user.location.street ?? "",
      zipcode: user.location.post_code ?? "",
      city: user.location.city ?? "",
      country: user.location.country ?? "",
      payoutSettingsType: user.payoutSettings.EthTransfer ? PayoutSettingsType.ETH : user.payoutSettings.WireTransfer ? PayoutSettingsType.IBAN : PayoutSettingsType.ETH,
      ethWalletAddress: user.payoutSettings.EthTransfer ?? "",
      iban: user.payoutSettings.WireTransfer?.iban ?? "",
      bic: user.payoutSettings.WireTransfer?.bic ?? "",
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data, loading }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser);
  const success = !!data;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = formMethods.watch("payoutSettingsType");
  const { T } = useIntl();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <>
          <div className="flex flex-col">
            {T("profile.form.typeOfProfile")}
            <div className="flex flex-row gap-3">
              <Radio
                name="paymentReceiverType"
                options={[
                  {
                    value: PaymentReceiverType.INDIVIDUAL,
                    label: T("profile.form.individualProfile"),
                  },
                  {
                    value: PaymentReceiverType.COMPANY,
                    label: T("profile.form.companyProfile"),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <Input
              label={T("profile.form.firstname")}
              name="firstName"
              placeholder={T("profile.form.firstname")}
              options={{ required: T("form.required") }}
            />
            <Input
              label={T("profile.form.lastname")}
              name="lastName"
              placeholder={T("profile.form.lastname")}
              options={{ required: T("form.required") }}
            />
          </div>
          <Input
            label={T("profile.form.email")}
            name="email"
            placeholder={T("profile.form.email")}
            options={{ required: T("form.required") }}
          />
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
            <Input name="zipcode" placeholder={T("profile.form.zipCode")} options={{ required: T("form.required") }} />
            <Input name="city" placeholder={T("profile.form.city")} options={{ required: T("form.required") }} />
            <Input name="country" placeholder={T("profile.form.country")} options={{ required: T("form.required") }} />
          </div>
          <div className="flex flex-col">
            {T("profile.form.payoutSettings")}
            <div className="flex flex-row gap-3">
              <Radio
                name="payoutSettingsType"
                options={[
                  {
                    value: PayoutSettingsType.ETH,
                    label: T("profile.form.ethereum"),
                  },
                  {
                    value: PayoutSettingsType.IBAN,
                    label: T("profile.form.bankWire"),
                  },
                ]}
              />
            </div>
          </div>
          {payoutSettingsType === PayoutSettingsType.ETH && (
            <Input
              name="ethWalletAddress"
              placeholder={T("profile.form.ethereumWalletAddress")}
              options={{ required: T("form.required") }}
            />
          )}
          {payoutSettingsType === PayoutSettingsType.IBAN && (
            <div className="flex flex-row gap-5">
              <Input name="iban" placeholder={T("profile.form.iban")} options={{ required: T("form.required") }} />
              <Input name="bic" placeholder={T("profile.form.bic")} options={{ required: T("form.required") }} />
            </div>
          )}
          <button type="submit" className="self-start border-white border-2 px-3 py-2 rounded-md">
            {loading ? T("state.loading") : T("profile.form.send")}
          </button>
          {success && <p>{T("profile.form.saved")}</p>}
        </>
      </form>
    </FormProvider>
  );
};

export const UPDATE_USER_MUTATION = gql`
  mutation updateProfileInfo($email:Email!, $identity: IdentityInput!, $location: Location!, $payoutSettings: PayoutSettingsInput!) {
    updateProfileInfo(identity: $identity, location: $location, payoutSettings: $payoutSettings, email: $email)
  }
`;

const mapFormDataToSchema = ({
  email,
  lastName,
  firstName,
  number,
  street,
  city,
  country,
  paymentReceiverType,
  zipcode,
  payoutSettingsType,
  ethWalletAddress,
  iban,
  bic,
}: Inputs) => {
  const identity = paymentReceiverType === PaymentReceiverType.INDIVIDUAL ? { type: "PERSON", optPerson: { lastname: lastName, firstname: firstName } } : { type: "COMPANY", optCompany: { id: lastName, name: firstName } };
  const location = {
    number: number,
    street: street,
    post_code: zipcode,
    city,
    country,
  };
  const payoutSettings = payoutSettingsType === PayoutSettingsType.ETH ? { type: "ETHEREUM_ADDRESS", optEthAddress: ethWalletAddress } : { type: "BANK_ADDRESS", optBankAddress: { iban, bic } };
  return {
    variables: {
      email,
      identity,
      location,
      payoutSettings
    },
  };
};

export default ProfileForm;

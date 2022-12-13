import { gql } from "@apollo/client";
import { HasuraUserRole, PaymentReceiverType, PayoutSettingsType, User } from "src/types";
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
  address: string;
  zipcode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsType;
  ethWalletAddress?: string;
  iban?: string;
  bic?: string;
};

type PropsType = {
  user: Pick<User, "id" | "metadata" | "email">;
};

const ProfileForm: React.FC<PropsType> = ({ user }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      paymentReceiverType: user?.metadata?.paymentReceiverType ?? PaymentReceiverType.INDIVIDUAL,
      firstName: user?.metadata?.firstName ?? "",
      lastName: user?.metadata?.lastName ?? "",
      email: user?.email ?? "",
      address: user?.metadata?.location?.address ?? "",
      zipcode: user?.metadata?.location?.zipcode ?? "",
      city: user?.metadata?.location?.city ?? "",
      country: user?.metadata?.location?.country ?? "",
      payoutSettingsType: user?.metadata?.payoutSettings?.type,
      ethWalletAddress: user?.metadata?.payoutSettings?.settings?.ethWalletAddress,
      iban: user?.metadata?.payoutSettings?.settings?.iban,
      bic: user?.metadata?.payoutSettings?.settings?.bic,
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data, loading }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.RegisteredUser, {
    variables: { userId: user.id },
  });
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
            label={T("profile.form.location")}
            name="address"
            placeholder={T("profile.form.location")}
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
  mutation UpdateUserProfile($userId: uuid!, $email: citext!, $metadata: jsonb!) {
    updateUser(pk_columns: { id: $userId }, _set: { email: $email, metadata: $metadata }) {
      metadata
      email
    }
  }
`;

const mapFormDataToSchema = ({
  email,
  lastName,
  firstName,
  address,
  city,
  country,
  paymentReceiverType,
  zipcode,
  payoutSettingsType,
  ethWalletAddress,
  iban,
  bic,
}: Inputs) => {
  const settings = payoutSettingsType === PayoutSettingsType.ETH ? { ethWalletAddress } : { iban, bic };
  return {
    variables: {
      email,
      metadata: {
        paymentReceiverType,
        firstName,
        lastName,
        location: {
          address,
          city,
          country,
          zipcode,
        },
        payoutSettings: {
          type: payoutSettingsType,
          settings,
        },
      },
    },
  };
};

export default ProfileForm;

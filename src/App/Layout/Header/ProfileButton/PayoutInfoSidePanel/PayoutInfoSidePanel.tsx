import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import IBANParser from "iban";
import { useIntl } from "src/hooks/useIntl";
import {
  Maybe,
  PreferredMethod,
  UpdatePayoutSettingsMutation,
  UserPayoutInfo,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import PayoutInfoSidePanelView from "./PayoutInfoSidePanelView";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { ProfileType } from "./types";
import SidePanel from "src/components/SidePanel";
import { usePayoutInfoValidation } from "./usePayoutInfoValidation";
import { useEffect } from "react";

type Props = {
  githubUserId?: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PayoutInfoSidePanel({ githubUserId, open, setOpen }: Props) {
  const { T } = useIntl();

  const { data: user, updatePayoutSettings, updatePayoutSettingsLoading } = usePayoutSettings(githubUserId);
  const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation(user);

  const formMethods = useForm<UserPayoutInfoType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty } = formState;

  useEffect(() => reset(decodeQuery(user)), [user]);

  const onSubmit: SubmitHandler<UserPayoutInfoType> = formData => {
    updatePayoutSettings(mapFormDataToSchema(formData));
    // optimisticly set form's defaultValues to submitted form data to avoid flickering related to isDirty
    reset(formData);
  };

  return (
    <SidePanel open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col">
        <div className="mx-6 border-b border-b-greyscale-50/8 pb-4 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("navbar.profile.payoutInfo")}
        </div>

        <FormProvider {...formMethods}>
          <form id="payout-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
            <PayoutInfoSidePanelView
              isContactInfoValid={isContactInfoValid}
              isPaymentInfoValid={isPaymentInfoValid}
              saveButtonDisabled={updatePayoutSettingsLoading || !isDirty}
              unsavedChanges={isDirty}
            />
          </form>
        </FormProvider>
      </div>
    </SidePanel>
  );
}

type UserPayoutInfoType = Omit<UserPayoutInfo, "userId" | "arePayoutSettingsValid" | "isCompany"> & {
  profileType: ProfileType;
};

const mapFormDataToSchema = (values: UserPayoutInfoType) => {
  const variables: UpdatePayoutSettingsMutation["updatePayoutInfo"] = {
    identity: {
      ...(values.profileType === ProfileType.Company
        ? {
            company: {
              name: values.companyName,
              identificationNumber: values.companyIdentificationNumber,
              owner: {
                firstname: values.firstname,
                lastname: values.lastname,
              },
            },
          }
        : {
            person: {
              firstname: values.firstname,
              lastname: values.lastname,
            },
          }),
    },
    location: {
      address: values.address,
      postCode: values.postCode,
      city: values.city,
      country: values.country,
    },
    payoutSettings: {
      usdPreferredMethod: values.usdPreferredMethod,
      ...(values.usdPreferredMethod === PreferredMethod.Fiat
        ? {
            bankAccount: {
              BIC: values.bic,
              IBAN: values.iban,
            },
          }
        : null),
      ethAddress: values.ethWallet || null,
      starknetAddress: values.starknetWallet || null,
      optimismAddress: values.optimismWallet || null,
      aptosAddress: values.aptosWallet || null,
    },
  };

  return { variables };
};

const decodeQuery = (user?: Maybe<UserPayoutSettingsFragment>): UserPayoutInfoType => ({
  firstname: user?.firstname ?? "",
  lastname: user?.lastname ?? "",
  companyName: user?.companyName ?? "",
  companyIdentificationNumber: user?.companyIdentificationNumber ?? "",
  address: user?.address ?? "",
  postCode: user?.postCode ?? "",
  city: user?.city ?? "",
  country: user?.country ?? "",
  ethWallet: user?.ethWallet ?? "",
  starknetWallet: user?.starknetWallet ?? "",
  optimismWallet: user?.optimismWallet ?? "",
  aptosWallet: user?.aptosWallet ?? "",
  iban: user?.iban ? IBANParser.printFormat(user?.iban) : "",
  bic: user?.bic ?? "",
  usdPreferredMethod: user?.usdPreferredMethod ?? PreferredMethod.Crypto,
  profileType: user?.isCompany ? ProfileType.Company : ProfileType.Individual,
});

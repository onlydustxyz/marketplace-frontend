import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import IBANParser from "iban";

import { useIntl } from "src/hooks/useIntl";
import { Maybe, PreferredMethod, UserPayoutInfo, UserPayoutSettingsFragment } from "src/__generated/graphql";
import PayoutInfoSidePanelView from "./PayoutInfoSidePanelView";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { ProfileType } from "./types";
import SidePanel from "src/components/SidePanel";
import { usePayoutInfoValidation } from "./usePayoutInfoValidation";

type Props = {
  githubUserId?: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PayoutInfoSidePanel({ githubUserId, open, setOpen }: Props) {
  const { T } = useIntl();

  const { data: user, updatePayoutSettings, updatePayoutSettingsLoading } = usePayoutSettings(githubUserId);
  const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation(user);

  console.log("DATA", user);

  const formMethods = useForm<UserPayoutInfo>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    defaultValues: decodeQuery(user),
  });

  const { watch, handleSubmit, setValue, formState, reset } = formMethods;
  const { isDirty } = formState;

  // useEffect(() => reset(decodeQuery(user)), [user]);

  const onSubmit: SubmitHandler<UserPayoutInfo> = formData => {
    // updatePayoutSettings(mapFormDataToSchema(formData));
    // optimisticly set form's defaultValues to submitted form data to avoid flickering related to isDirty
    reset(formData);
  };

  // const isUsdPreferredMethod = watch("usdPreferredMethod");

  // useEffect(() => {
  //   if (profileType === ProfileType.Individual) {
  //     // setValue("payoutSettingsType", PayoutSettingsDisplayType.EthereumIdentity);
  //     setValue("profileType", ProfileType.Individual);
  //   }
  // }, [profileType]);

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

// const mapFormDataToSchema = ({
//   profileType,
//   lastname,
//   firstname,
//   address,
//   companyName,
//   city,
//   country,
//   postCode,
//   payoutSettingsType,

//   identificationNumber,
//   IBAN,
//   BIC,
//   ethWallet,
//   starknetWallet,
//   optimismWallet,
//   aptosWallet,
// }: UserPayoutInfo) => {
//   const variables: UpdatePayoutSettingsMutationVariables = {
//     identity: null,
//     location: null,
//     payoutSettings: null,
//   };

//   if (profileType === ProfileType.Individual && (firstname || lastname)) {
//     variables.identity = {
//       person: {
//         firstname: firstname || null,
//         lastname: lastname || null,
//       },
//       company: null,
//     };
//   }
//   if (profileType === ProfileType.Company && (firstname || lastname || companyName || identificationNumber)) {
//     variables.identity = {
//       company: {
//         name: companyName || null,
//         identificationNumber: identificationNumber || null,
//         owner: {
//           firstname: firstname || null,
//           lastname: lastname || null,
//         },
//       },
//       person: null,
//     };
//   }

//   if (address || postCode || city || country) {
//     variables.location = {
//       address: address || null,
//       postCode: postCode || null,
//       city: city || null,
//       country: country || null,
//     };
//   }

//   const payoutType =
//     payoutSettingsType === PayoutSettingsDisplayType.BankAddress
//       ? PayoutSettingsDisplayType.BankAddress
//       : ethWallet?.match(ENS_DOMAIN_REGEXP)
//       ? PayoutSettingsDisplayType.EthereumIdentity
//       : PayoutSettingsDisplayType.EthereumAddress;

//   if (payoutType === PayoutSettingsDisplayType.EthereumAddress && ethWallet) {
//     variables.payoutSettings = {
//       optEthAddress: ethWallet,
//       optBankAddress: null,
//       optEthName: null,
//       type: PayoutSettingsType.EthereumAddress,
//     };
//   }
//   if (payoutType === PayoutSettingsDisplayType.EthereumName && ethWallet) {
//     variables.payoutSettings = {
//       optEthAddress: null,
//       optBankAddress: null,
//       optEthName: ethWallet,
//       type: PayoutSettingsDisplayType.EthereumName,
//     };
//   }

//   if (payoutType === PayoutSettingsDisplayType.BankAddress && IBAN && BIC) {
//     variables.payoutSettings = {
//       optEthAddress: null,
//       optBankAddress: { IBAN: IBANParser.electronicFormat(IBAN), BIC },
//       optEthName: null,
//       type: PayoutSettingsDisplayType.BankAddress,
//     };
//   }

//   return { variables };
// };

// const mapFormDataToSchema = ({
//   profileType,
//   lastname,
//   firstname,
//   address,
//   companyName,
//   city,
//   country,
//   postCode,
//   payoutSettingsType,

//   identificationNumber,
//   IBAN,
//   BIC,
//   ethWallet,
//   starknetWallet,
//   optimismWallet,
//   aptosWallet,
// }: UserPayoutInfo) => {
//   const variables: UpdatePayoutSettingsMutationVariables = {
//     identity: null,
//     location: null,
//     payoutSettings: null,
//   };

//   return { variables };
// };

// Setting empty strings instead of undefined is required to make isDirty work properly
const decodeQuery = (
  user?: Maybe<UserPayoutSettingsFragment>
): Omit<UserPayoutInfo, "userId" | "arePayoutSettingsValid" | "isCompany"> & { profileType: ProfileType } => ({
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

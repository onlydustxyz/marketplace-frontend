import IBANParser from "iban";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ErrorFallback from "src/ErrorFallback";
import { components } from "src/__generated/api";
import { PreferredMethod } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useMutationRestfulData, useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useShowToaster } from "src/hooks/useToaster";
import PayoutInfoSidePanelView from "./PayoutInfoSidePanelView";
import { ProfileType } from "./types";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PayoutInfoSidePanel({ open, setOpen }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();

  const { data: user, isError } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_PAYOUT_INFO,
    method: "GET",
  });

  const { mutate: userPayoutInformation, isPending: userPayoutInformationIsPending } = useMutationRestfulData({
    resourcePath: ApiResourcePaths.GET_PAYOUT_INFO,
    onSuccess: () => showToaster(T("profile.form.success")),
  });

  const formMethods = useForm<FormDataType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const { handleSubmit, formState, reset } = formMethods;
  const { isDirty } = formState;
  useEffect(() => reset(decodeQuery(user)), [user]);

  const onSubmit: SubmitHandler<FormDataType> = formData => {
    userPayoutInformation(mapFormDataToSchema(formData));
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
              saveButtonDisabled={userPayoutInformationIsPending || !isDirty}
              unsavedChanges={isDirty}
            />
          </form>
        </FormProvider>
      </div>
    </SidePanel>
  );
}

type UserPayoutRequestType = components["schemas"]["UserPayoutInformationRequest"];

const mapFormDataToSchema = (values: FormDataType): UserPayoutRequestType => {
  const variables: UserPayoutRequestType = {
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
    location: {
      address: values.address,
      postalCode: values.postCode,
      city: values.city,
      country: values.country,
    },
    payoutSettings: {
      usdPreferredMethod: values.usdPreferredMethod,
      ...(values.usdPreferredMethod === PreferredMethod.Fiat
        ? {
            sepaAccount: {
              bic: values.bic,
              iban: values.iban,
            },
          }
        : null),
      ethAddress: values.ethWallet || undefined,
      starknetAddress: values.starknetWallet || undefined,
      optimismAddress: values.optimismWallet || undefined,
      aptosAddress: values.aptosWallet || undefined,
    },
    isCompany: values.profileType === ProfileType.Company,
  };

  return variables;
};

type UserPayoutType = components["schemas"]["UserPayoutInformationResponse"];

type FormDataType = {
  firstname: string;
  lastname: string;
  companyName: string;
  companyIdentificationNumber: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
  ethWallet: string;
  starknetWallet: string;
  optimismWallet: string;
  aptosWallet: string;
  iban: string;
  bic: string;
  usdPreferredMethod: components["schemas"]["UserPayoutInformationResponsePayoutSettings"]["usdPreferredMethod"];
  profileType: ProfileType;
  hasValidContactInfo: boolean;
  hasValidPayoutSettings: boolean;
};

const decodeQuery = (user: UserPayoutType): FormDataType => {
  const { location, person, payoutSettings, company, hasValidContactInfo } = user || {};
  return {
    firstname: (person?.firstname || company?.owner?.firstname) ?? "",
    lastname: (person?.lastname || company?.owner?.lastname) ?? "",
    companyName: company?.name ?? "",
    companyIdentificationNumber: company?.identificationNumber ?? "",
    address: location?.address ?? "",
    postCode: location?.postalCode ?? "",
    city: location?.city ?? "",
    country: location?.country ?? "",
    ethWallet: (payoutSettings?.ethAddress || payoutSettings?.ethName) ?? "",
    starknetWallet: payoutSettings?.starknetAddress ?? "",
    optimismWallet: payoutSettings?.optimismAddress ?? "",
    aptosWallet: payoutSettings?.aptosAddress ?? "",
    iban: payoutSettings?.sepaAccount?.iban ? IBANParser.printFormat(payoutSettings?.sepaAccount?.iban) : "",
    bic: payoutSettings?.sepaAccount?.bic ?? "",
    usdPreferredMethod: payoutSettings?.usdPreferredMethod ?? PreferredMethod.Crypto,
    profileType: user?.isCompany ? ProfileType.Company : ProfileType.Individual,
    hasValidContactInfo: !!hasValidContactInfo,
    hasValidPayoutSettings: !!payoutSettings?.hasValidPayoutSettings,
  };
};

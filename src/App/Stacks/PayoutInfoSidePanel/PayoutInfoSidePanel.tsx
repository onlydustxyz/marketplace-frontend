import IBANParser from "iban";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useStackPayoutInfo } from "src/App/Stacks/Stacks";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import PayoutInfoSidePanelView from "./PayoutInfoSidePanelView";
import { ProfileType } from "./types";
import { usePayoutInfoValidation } from "./usePayoutInfoValidation";

export default function PayoutInfoSidePanel() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const [, close] = useStackPayoutInfo();
  const { data: user } = MeApi.queries.useGetMyPayoutInfo({});

  const { mutate: userPayoutInformation, isPending: userPayoutInformationIsPending } = MeApi.mutations.usePayoutInfo({
    options: {
      onSuccess: (_, queryClient) => {
        showToaster(T("profile.form.success"));
        queryClient.invalidateQueries();
        close();
      },
    },
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

  const { isContactInfoValid, isPaymentInfoValid, isContactInfoComplete, isPayoutInfoComplete, requiredFields } =
    usePayoutInfoValidation(user);

  return (
    <div className="flex h-full flex-col">
      <div className="mx-6 border-b border-b-greyscale-50/8 pb-4 font-belwe text-2xl font-normal text-greyscale-50">
        {T("navbar.profile.payoutInfo")}
      </div>

      <FormProvider {...formMethods}>
        <form id="payout-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
          <PayoutInfoSidePanelView
            saveButtonDisabled={userPayoutInformationIsPending || !isDirty}
            unsavedChanges={isDirty}
            isContactInfoComplete={isContactInfoComplete}
            isContactInfoValid={isContactInfoValid}
            isPaymentInfoValid={isPaymentInfoValid}
            isPayoutInfoComplete={isPayoutInfoComplete}
            requiredFields={requiredFields}
          />
        </form>
      </FormProvider>
    </div>
  );
}

type UserPayoutRequestType = components["schemas"]["UserPayoutInformationRequest"];

const mapFormDataToSchema = (values: FormDataType): UserPayoutRequestType => {
  const sepaAccount = values.bic && values.iban ? { bic: values.bic, iban: values.iban } : undefined;

  return {
    ...(values.profileType === ProfileType.Company
      ? {
          company: {
            name: values.companyName || undefined,
            identificationNumber: values.companyIdentificationNumber || undefined,
            owner: {
              firstname: values.firstname || undefined,
              lastname: values.lastname || undefined,
            },
          },
        }
      : {
          person: {
            firstname: values.firstname || undefined,
            lastname: values.lastname || undefined,
          },
        }),
    location: {
      address: values.address || undefined,
      postalCode: values.postCode || undefined,
      city: values.city || undefined,
      country: values.country || undefined,
    },
    payoutSettings: {
      sepaAccount,
      ethWallet: values.ethWallet || undefined,
      starknetAddress: values.starknetWallet || undefined,
      optimismAddress: values.optimismWallet || undefined,
      aptosAddress: values.aptosWallet || undefined,
    },
    isCompany: values.profileType === ProfileType.Company,
  };
};

export type UserPayoutType = components["schemas"]["UserPayoutInformationResponse"];

export type FormDataType = {
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
  profileType: ProfileType;
};

const decodeQuery = (user?: UserPayoutType): FormDataType => {
  const { location, person, payoutSettings, company } = user || {};
  return {
    firstname: (person?.firstname || company?.owner?.firstname) ?? "",
    lastname: (person?.lastname || company?.owner?.lastname) ?? "",
    companyName: company?.name ?? "",
    companyIdentificationNumber: company?.identificationNumber ?? "",
    address: location?.address ?? "",
    postCode: location?.postalCode ?? "",
    city: location?.city ?? "",
    country: location?.country ?? "",
    ethWallet: payoutSettings?.ethWallet ?? "",
    starknetWallet: payoutSettings?.starknetAddress ?? "",
    optimismWallet: payoutSettings?.optimismAddress ?? "",
    aptosWallet: payoutSettings?.aptosAddress ?? "",
    iban: payoutSettings?.sepaAccount?.iban ? IBANParser.printFormat(payoutSettings?.sepaAccount?.iban) : "",
    bic: payoutSettings?.sepaAccount?.bic ?? "",
    profileType: user?.isCompany ? ProfileType.Company : ProfileType.Individual,
  };
};

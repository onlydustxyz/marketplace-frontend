import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import IBANParser from "iban";

import { useIntl } from "src/hooks/useIntl";
import {
  Maybe,
  PayoutSettings,
  PreferredMethod,
  UpdatePayoutSettingsMutationVariables,
  UserPayoutSettingsFragment,
} from "src/__generated/graphql";
import { useEffect } from "react";
import PayoutInfoSidePanelView from "./PayoutInfoSidePanelView";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PayoutSettingsDisplayType, ProfileType, UserPayoutInfo } from "./types";
import SidePanel from "src/components/SidePanel";

const ENS_DOMAIN_REGEXP = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;

type Props = {
  githubUserId?: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PayoutInfoSidePanel({ githubUserId, open, setOpen }: Props) {
  const { T } = useIntl();

  const {
    data: user,
    valid: payoutSettingsValid,
    updatePayoutSettings,
    updatePayoutSettingsLoading,
  } = usePayoutSettings(githubUserId);

  const formMethods = useForm<UserPayoutInfo>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const { watch, handleSubmit, setValue, formState, reset } = formMethods;
  const { isDirty } = formState;

  useEffect(() => reset(decodeQuery(user)), [user]);

  const onSubmit: SubmitHandler<UserPayoutInfo> = formData => {
    updatePayoutSettings(mapFormDataToSchema(formData));
    // optimisticly set form's defaultValues to submitted form data to avoid flickering related to isDirty
    reset(formData);
  };

  const profileType = watch("profileType");

  useEffect(() => {
    if (profileType === ProfileType.Individual) {
      setValue("payoutSettingsType", PayoutSettingsDisplayType.EthereumIdentity);
    }
  }, [profileType]);

  return (
    <SidePanel open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col">
        <div className="mx-6 border-b border-b-greyscale-50/8 pb-4 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("navbar.profile.payoutInfo")}
        </div>

        <FormProvider {...formMethods}>
          <form id="payout-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
            <PayoutInfoSidePanelView
              payoutSettingsValid={payoutSettingsValid}
              saveButtonDisabled={updatePayoutSettingsLoading || !isDirty}
              unsavedChanges={isDirty}
            />
          </form>
        </FormProvider>
      </div>
    </SidePanel>
  );
}

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
}: UserPayoutInfo) => {
  const variables: UpdatePayoutSettingsMutationVariables = {
    identity: null,
    location: null,
    payoutSettings: null,
  };

  if (profileType === ProfileType.Individual && (firstname || lastname)) {
    variables.identity = {
      person: {
        firstname: firstname || null,
        lastname: lastname || null,
      },
      company: null,
    };
  }
  if (profileType === ProfileType.Company && (firstname || lastname || companyName || identificationNumber)) {
    variables.identity = {
      company: {
        name: companyName || null,
        identificationNumber: identificationNumber || null,
        owner: {
          firstname: firstname || null,
          lastname: lastname || null,
        },
      },
      person: null,
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

  variables.payoutSettings = {
    usdPreferredMethod:
      payoutSettingsType === PayoutSettingsDisplayType.BankAddress ? PreferredMethod.Fiat : PreferredMethod.Crypto,
    bankAccount:
      payoutSettingsType === PayoutSettingsDisplayType.BankAddress && BIC && IBAN
        ? { IBAN: IBANParser.electronicFormat(IBAN), BIC }
        : null,
    ethAddress:
      (payoutSettingsType === PayoutSettingsDisplayType.EthereumIdentity &&
        !ethIdentity?.match(ENS_DOMAIN_REGEXP) &&
        ethIdentity) ||
      null,
    ethName:
      payoutSettingsType === PayoutSettingsDisplayType.EthereumIdentity && ethIdentity?.match(ENS_DOMAIN_REGEXP)
        ? ethIdentity
        : null,
    aptosAddress: null,
    optimismAddress: null,
    starknetAddress: null,
  };

  return { variables };
};

// Setting empty strings instead of undefined is required to make isDirty work properly
const decodeQuery = (user?: Maybe<UserPayoutSettingsFragment>): UserPayoutInfo => ({
  profileType: user?.isCompany ? ProfileType.Company : ProfileType.Individual,
  firstname: user?.firstname || "",
  lastname: user?.lastname || "",
  companyName: user?.companyName || "",
  identificationNumber: user?.companyIdentificationNumber || "",
  address: user?.address || "",
  postCode: user?.postCode || "",
  city: user?.city || "",
  country: user?.country || "",
  payoutSettingsType:
    user?.usdPreferredMethod === PreferredMethod.Fiat
      ? PayoutSettingsDisplayType.BankAddress
      : PayoutSettingsDisplayType.EthereumIdentity,
  ethWallet: user?.ethWallet || "",
  IBAN: user?.iban ? IBANParser.printFormat(user?.iban) : "",
  BIC: user?.bic || "",
});

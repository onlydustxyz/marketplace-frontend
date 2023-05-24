import { useForm, SubmitHandler, FormProvider, SubmitErrorHandler } from "react-hook-form";
import IBANParser from "iban";

import { useIntl } from "src/hooks/useIntl";
import {
  IdentityType,
  PayoutSettingsType,
  UpdateProfileInfoMutationVariables,
  useUpdateProfileInfoMutation,
} from "src/__generated/graphql";
import { useShowToaster } from "src/hooks/useToaster";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";
import View from "./View";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PayoutSettingsDisplayType, ProfileType, UserPayoutInfo } from "./types";
import SidePanel from "src/components/SidePanel";

const ENS_DOMAIN_REGEXP = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PayoutInfoSidePanel({ open, setOpen }: Props) {
  const { githubUserId } = useAuth();
  const { T } = useIntl();

  const { data: user, valid: payoutSettingsValid } = usePayoutSettings(githubUserId);

  const formMethods = useForm<UserPayoutInfo>({
    defaultValues: {
      profileType: user?.identity?.Company ? ProfileType.Company : ProfileType.Individual,
      firstname: user?.identity?.Company
        ? user?.identity?.Company?.owner?.firstname
        : user?.identity?.Person?.firstname,
      lastname: user?.identity?.Company ? user?.identity?.Company?.owner?.lastname : user?.identity?.Person?.lastname,
      companyName: user?.identity?.Company?.name,
      identificationNumber: user?.identity?.Company?.identification_number,
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
      IBAN: user?.payoutSettings?.WireTransfer?.IBAN
        ? IBANParser.printFormat(user?.payoutSettings?.WireTransfer?.IBAN)
        : undefined,
      BIC: user?.payoutSettings?.WireTransfer?.BIC,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  const { watch, handleSubmit, setValue } = formMethods;
  const showToaster = useShowToaster();

  // TODO set optimimistic ?
  const [updateUser, { loading: updateUserLoading }] = useUpdateProfileInfoMutation({
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("profile.form.success")),
  });

  const onSubmit: SubmitHandler<UserPayoutInfo> = formData => {
    updateUser(mapFormDataToSchema(formData));
  };

  // TODO keep this ?
  const onSubmitError: SubmitErrorHandler<UserPayoutInfo> = () => {
    const errorLabel = document.querySelector("label > div.text-orange-500");
    if (errorLabel) {
      errorLabel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const profileType = watch("profileType");

  useEffect(() => {
    if (profileType === ProfileType.Individual) {
      setValue("payoutSettingsType", PayoutSettingsDisplayType.EthereumIdentity);
    }
  }, [profileType]);

  return (
    <SidePanel open={open} setOpen={setOpen} title={T("navbar.profile.payoutInfo")}>
      <FormProvider {...formMethods}>
        <form id="payout-info-form" className="h-full" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          <View payoutSettingsValid={payoutSettingsValid} saveButtonDisabled={updateUserLoading} />
        </form>
      </FormProvider>
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
  const variables: UpdateProfileInfoMutationVariables = {
    contactInformation: null,
    identity: null,
    location: null,
    payoutSettings: null,
  };

  if (profileType === ProfileType.Individual && (firstname || lastname)) {
    variables.identity = {
      type: IdentityType.Person,
      optPerson: {
        firstname: firstname || null,
        lastname: lastname || null,
      },
      optCompany: null,
    };
  }
  if (profileType === ProfileType.Company && (firstname || lastname || companyName || identificationNumber)) {
    variables.identity = {
      type: IdentityType.Company,
      optCompany: {
        name: companyName || null,
        identificationNumber: identificationNumber || null,
        owner: {
          firstname: firstname || null,
          lastname: lastname || null,
        },
      },
      optPerson: null,
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
      optBankAddress: { IBAN: IBANParser.electronicFormat(IBAN), BIC },
      optEthName: null,
      type: PayoutSettingsType.BankAddress,
    };
  }

  return { variables };
};

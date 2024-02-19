import IBANParser from "iban";

import { TPayoutForm } from "app/settings/payout/features/form/form.types";

import { UseGetMyPayoutSettingsResponse } from "src/api/me/queries";

export function formatToData(data: UseGetMyPayoutSettingsResponse): TPayoutForm.Data {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, sepaAccount } = data;

  return {
    ethWallet: ethWallet ?? "",
    starknetAddress: starknetAddress ?? "",
    optimismAddress: optimismAddress ?? "",
    aptosAddress: aptosAddress ?? "",
    sepaAccount: {
      iban: sepaAccount?.iban ? IBANParser.printFormat(sepaAccount?.iban) : "",
      bic: sepaAccount?.bic ?? "",
    },
  };
}

export function formatToSchema(data: TPayoutForm.Data) {
  const {
    ethWallet,
    starknetAddress,
    optimismAddress,
    aptosAddress,
    sepaAccount: { iban, bic },
  } = data;

  const emptyStringToUndefined = (value?: string) => (value === "" ? undefined : value);

  return {
    ethWallet: emptyStringToUndefined(ethWallet),
    starknetAddress: emptyStringToUndefined(starknetAddress),
    optimismAddress: emptyStringToUndefined(optimismAddress),
    aptosAddress: emptyStringToUndefined(aptosAddress),
    sepaAccount: {
      iban: emptyStringToUndefined(iban),
      bic: emptyStringToUndefined(bic),
    },
  };
}

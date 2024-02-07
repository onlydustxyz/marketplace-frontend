import IBANParser from "iban";

import { UseGetMyPayoutInfoResponse } from "src/api/me/queries";

import { TPayoutForm } from "./form.types";

export function formatToData(data: UseGetMyPayoutInfoResponse): TPayoutForm.Data {
  const { payoutSettings } = data;

  return {
    ethWallet: payoutSettings?.ethWallet ?? "",
    starknetAddress: payoutSettings?.starknetAddress ?? "",
    optimismAddress: payoutSettings?.optimismAddress ?? "",
    aptosAddress: payoutSettings?.aptosAddress ?? "",
    sepaAccount: {
      iban: payoutSettings?.sepaAccount?.iban ? IBANParser.printFormat(payoutSettings?.sepaAccount?.iban) : "",
      bic: payoutSettings?.sepaAccount?.bic ?? "",
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

  return {
    payoutSettings: {
      ethWallet,
      starknetAddress,
      optimismAddress,
      aptosAddress,
      sepaAccount: {
        iban,
        bic,
      },
    },
  };
}

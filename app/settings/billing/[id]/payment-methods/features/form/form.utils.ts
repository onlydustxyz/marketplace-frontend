import IBANParser from "iban";

import { UseGetBillingProfilePayout } from "src/api/BillingProfiles/queries";

import { TPayoutForm } from "./form.types";

export function formatToData(data: UseGetBillingProfilePayout): TPayoutForm.Data {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, stellarAccountId, bankAccount } = data;

  return {
    ethWallet: ethWallet ?? "",
    starknetAddress: starknetAddress ?? "",
    optimismAddress: optimismAddress ?? "",
    aptosAddress: aptosAddress ?? "",
    stellarAccountId: stellarAccountId ?? "",
    bankAccount: {
      number: bankAccount?.number ? IBANParser.printFormat(bankAccount?.number) : "",
      bic: bankAccount?.bic ?? "",
    },
  };
}

export function formatToSchema(data: TPayoutForm.Data) {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, stellarAccountId, bankAccount } = data;
  const emptyStringToUndefined = (value?: string) => (value === "" ? undefined : value);
  const number = emptyStringToUndefined(bankAccount?.number);
  const bic = emptyStringToUndefined(bankAccount?.bic);
  return {
    ethWallet: emptyStringToUndefined(ethWallet),
    starknetAddress: emptyStringToUndefined(starknetAddress),
    optimismAddress: emptyStringToUndefined(optimismAddress),
    aptosAddress: emptyStringToUndefined(aptosAddress),
    stellarAccountId: emptyStringToUndefined(stellarAccountId),
    ...(number && bic
      ? {
          bankAccount: {
            number,
            bic,
          },
        }
      : {}),
  };
}

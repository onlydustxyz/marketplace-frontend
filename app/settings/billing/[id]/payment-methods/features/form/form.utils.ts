import IBANParser from "iban";

import { UseGetBillingProfilePayout } from "src/api/BillingProfiles/queries";

import { TPayoutForm } from "./form.types";

export function formatToData(data: UseGetBillingProfilePayout): TPayoutForm.Data {
  const { ethWallet, starknetAddress, optimismAddress, aptosAddress, bankAccount } = data;

  return {
    ethWallet: ethWallet ?? "",
    starknetAddress: starknetAddress ?? "",
    optimismAddress: optimismAddress ?? "",
    aptosAddress: aptosAddress ?? "",
    bankAccount: {
      number: bankAccount?.number ? IBANParser.printFormat(bankAccount?.number) : "",
      bic: bankAccount?.bic ?? "",
    },
  };
}

export function formatToSchema(data: TPayoutForm.Data) {
  const {
    ethWallet,
    starknetAddress,
    optimismAddress,
    aptosAddress,
    bankAccount: { number, bic },
  } = data;

  const emptyStringToUndefined = (value?: string) => (value === "" ? undefined : value);
  const hasIban = emptyStringToUndefined(number);
  const hasBic = emptyStringToUndefined(bic);

  return {
    ethWallet: emptyStringToUndefined(ethWallet),
    starknetAddress: emptyStringToUndefined(starknetAddress),
    optimismAddress: emptyStringToUndefined(optimismAddress),
    aptosAddress: emptyStringToUndefined(aptosAddress),
    ...(hasIban || hasBic
      ? {
          bankAccount: {
            number: hasIban,
            bic: hasBic,
          },
        }
      : {}),
  };
}

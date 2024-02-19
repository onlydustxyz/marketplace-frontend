import { InvoicePreviewResponse } from "actions/billing-profiles/billing-profiles-queries.actions";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function getHeaderProps({
  isSample,
  isUserIndividual,
  invoiceNumber,
}: {
  isSample: string;
  isUserIndividual: boolean;
  invoiceNumber: string;
}): TInvoice.HeaderProps {
  let title = "";
  // provided as a query param string
  if (isSample === "true") {
    title = InvoiceTokens.header.sampleTitle;
  } else {
    title = `${
      isUserIndividual ? InvoiceTokens.header.receiptTitle : InvoiceTokens.header.invoiceTitle
    } #${invoiceNumber}`;
  }
  return {
    title,
  };
}

export function getInvoiceInfoProps({
  isUserIndividual,
  invoiceDetails,
}: {
  isUserIndividual: boolean;
  invoiceDetails: InvoicePreviewResponse;
}): TInvoice.InvoiceInfoProps {
  const bankAccount = invoiceDetails.destinationAccounts.bankAccount
    ? `Account number: ${invoiceDetails.destinationAccounts.bankAccount.accountNumber} / BIC: ${invoiceDetails.destinationAccounts.bankAccount.bic}`
    : null;
  const wallets = invoiceDetails.destinationAccounts.wallets?.length
    ? invoiceDetails.destinationAccounts.wallets.map(wallet => `${wallet.network}: ${wallet.address}`)
    : null;

  const accounts = [bankAccount, wallets];

  const restInfos = {
    recipientInfos: {
      name: InvoiceTokens.invoiceInfos.wagmiName,
      address: InvoiceTokens.invoiceInfos.wagmiAddress,
      registrationNumber: InvoiceTokens.invoiceInfos.wagmiRegistrationNumber,
      euVATNumber: InvoiceTokens.invoiceInfos.wagmiEuVATNumber,
    },
    legalInfos: {
      generationDate: getFormattedDateToLocaleDateString(new Date(invoiceDetails.createdAt)),
      dueDate: getFormattedDateToLocaleDateString(new Date(invoiceDetails.dueAt)),
      destinationAccounts: accounts.flat(),
    },
  };

  if (isUserIndividual) {
    const billingProfile = invoiceDetails.individualBillingProfile;
    return {
      senderInfos: {
        name: `${billingProfile?.firstName} ${billingProfile?.lastName}`,
        address: billingProfile?.address ?? "",
      },
      ...restInfos,
    };
  } else {
    const billingProfile = invoiceDetails.companyBillingProfile;
    return {
      senderInfos: {
        name: billingProfile?.name ?? "",
        address: billingProfile?.address ?? "",
        euVATNumber: billingProfile?.euVATNumber,
      },
      ...restInfos,
    };
  }
}

export function getRewardsSummaryProps({
  invoiceDetails,
}: {
  invoiceDetails: InvoicePreviewResponse;
}): TInvoice.RewardsSummaryProps {
  const rewards = invoiceDetails.rewards;
  const totalBeforeTax = invoiceDetails.totalBeforeTax?.amount;
  const totalTax = invoiceDetails.totalTax?.amount;
  const totalAfterTax = invoiceDetails.totalAfterTax?.amount;
  const vat = {
    vatRegulationState: invoiceDetails.companyBillingProfile?.vatRegulationState,
    euVATNumber: invoiceDetails.companyBillingProfile?.euVATNumber,
    rate: invoiceDetails.taxRate,
  };

  return {
    rewards,
    vat,
    totalBeforeTax,
    totalTax,
    totalAfterTax,
  };
}
//
// export const invoiceMock = {
//   id: "OD-143011364-123",
//   generationDate: "2024-02-13T09:24:21.223Z",
//   dueDate: "2024-02-13T09:24:21.223Z",
//   billingProfileType: "INDIVIDUAL",
//   individualBillingProfile: {
//     firstName: "Mehdi",
//     lastName: "Hamri",
//     address: "1 rue de la combatte, 90600 Grandvillars, France",
//   },
//   companyBillingProfile: {
//     registrationNumber: "987 987 876 001",
//     name: "Pixelfact",
//     address: "1 rue de la combatte, 90600 Grandvillars, France",
//   },
//   destinationAccounts: {
//     sepaAccount: {
//       iban: "FR74 3000 3030 3000 0505 0001 000",
//       bic: "SOGEFRPP",
//     },
//     wallets: [
//       {
//         address: "0xa645c3bdd0dfd0c3628803075b3b133e8426061dc915ef996cc5ed4cece6d4e5",
//         network: "Etherium Network",
//       },
//       {
//         address: "0xa645c3bdd0dfd0c3628803075b3b133e8426061dc915ef996cc5ed4cece6d4e5",
//         network: "Lords Network",
//       },
//       {
//         address: "0xa645c3bdd0dfd0c3628803075b3b133e8426061dc915ef996cc5ed4cece6d4e5",
//         network: "Usdc Network",
//       },
//     ],
//   },
//   fiatEquivalents: [
//     {
//       fiat: "USD",
//       currency: "USDC",
//       value: 10.76,
//     },
//     {
//       fiat: "USD",
//       currency: "LORDS",
//       value: 0.126,
//     },
//     {
//       fiat: "USD",
//       currency: "ETH",
//       value: 108.16,
//     },
//   ],
//   vatRegulationState: "VAT_APPLICABLE",
//   euVATNumber: "FR12345678901",
//   rewards: [
//     {
//       amount: {
//         total: 34,
//         currency: "USDC",
//         dollarsEquivalent: 189.99,
//       },
//       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       date: "2024-02-13T09:24:21.224Z",
//       projectName: "Deluge",
//     },
//     {
//       amount: {
//         total: 12,
//         currency: "LORDS",
//         dollarsEquivalent: 39.6,
//       },
//       id: "3fa85f84-5717-4562-b3fc-2c963f66afa6",
//       date: "2024-02-11T09:24:21.224Z",
//       projectName: "Onlydust",
//     },
//     {
//       amount: {
//         total: 34,
//         currency: "ETH",
//         dollarsEquivalent: 79.29,
//       },
//       id: "3fa85f64-5787-4562-b3fc-2c963f66afa6",
//       date: "2024-01-18T09:24:21.224Z",
//       projectName: "PizzaYoshi",
//     },
//   ],
// };

import { TInvoiceBuilders } from "app/api/invoice/builders/builders.types";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function getHeaderProps({
  isSample,
  isUserIndividual,
  invoiceNumber,
}: TInvoiceBuilders.HeaderBuilderProps): TInvoice.HeaderProps {
  let title = "";
  // provided as a query param string
  // this means a exemple that user can use to make their own invoice
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
}: TInvoiceBuilders.InvoiceInfoBuilderProps): TInvoice.InvoiceInfoProps {
  // as we can have multiple destination accounts, we need to handle them differently
  // bank account is an object containing only 2 fields
  // wallets is an array of objects containing 2 fields
  const bankAccount = invoiceDetails.destinationAccounts.bankAccount
    ? `${InvoiceTokens.invoiceInfos.accountNumber}: ${invoiceDetails.destinationAccounts.bankAccount.accountNumber} / ${InvoiceTokens.invoiceInfos.bic}: ${invoiceDetails.destinationAccounts.bankAccount.bic}`
    : null;
  const wallets = invoiceDetails.destinationAccounts.wallets?.length
    ? invoiceDetails.destinationAccounts.wallets.map(wallet => `${wallet.network}: ${wallet.address}`)
    : null;

  const accounts = [...(bankAccount ? [bankAccount] : []), ...(wallets ? [...wallets] : [])];

  const restInfos = {
    isUserIndividual,
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
        name: `${billingProfile?.firstName ?? ""} ${billingProfile?.lastName ?? ""}`,
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
  isUserIndividual,
  invoiceDetails,
}: TInvoiceBuilders.RewardsSummaryBuilderProps): TInvoice.RewardsSummaryProps {
  const rewards = invoiceDetails.rewards;
  const totalBeforeTax = invoiceDetails.totalBeforeTax?.amount;
  const totalTax = invoiceDetails.totalTax?.amount;
  const totalAfterTax = invoiceDetails.totalAfterTax?.amount;
  const usdToEurConversionRate = invoiceDetails.usdToEurConversionRate;
  const totalAfterTaxPerCurrency = invoiceDetails.totalAfterTaxPerCurrency;
  const vat = {
    vatRegulationState: invoiceDetails.companyBillingProfile?.vatRegulationState,
    euVATNumber: invoiceDetails.companyBillingProfile?.euVATNumber,
    rate: invoiceDetails.taxRate,
  };

  return {
    isUserIndividual,
    rewards,
    vat,
    totalBeforeTax,
    totalTax,
    totalAfterTax,
    totalAfterTaxPerCurrency,
    usdToEurConversionRate,
  };
}

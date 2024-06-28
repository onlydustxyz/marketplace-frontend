import { InvoicePreviewResponse } from "actions/billing-profiles/billing-profiles-queries.actions";
import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";

export namespace TInvoice {
  interface SenderInfo {
    firstName?: string;
    lastName?: string;
    name?: string;
    address: string;
    registrationNumber?: string;
    euVATNumber?: string;
  }

  interface RecipientInfo {
    name: string;
    address: string;
    registrationNumber?: string;
    euVATNumber?: string;
  }

  interface LegalInfo {
    generationDate: string;
    dueDate: string;
    destinationAccounts: (string | string[] | null)[];
  }

  interface Vat {
    vatRegulationState:
      | components["schemas"]["InvoicePreviewResponseCompanyBillingProfile"]["vatRegulationState"]
      | undefined;
    euVATNumber: string | undefined;
    rate: number | undefined;
  }

  export interface HeaderProps {
    title: string;
  }

  export interface InvoiceInfoProps {
    isUserIndividual: boolean;
    senderInfos: SenderInfo;
    recipientInfos: RecipientInfo;
    legalInfos: LegalInfo;
  }

  export interface InvoiceVatInfoProps {
    vat: Vat;
    totalTax: number | undefined;
  }

  export interface RewardsSummaryProps {
    isUserIndividual: boolean;
    rewards: InvoicePreviewResponse["rewards"];
    vat: Vat;
    totalBeforeTax: number | undefined;
    totalTax: number | undefined;
    totalAfterTax: number | undefined;
    usdToEurConversionRate: number | undefined;
    totalAfterTaxPerCurrency: { currency: Money.Currency; amount: number }[] | undefined;
  }

  export interface FooterProps {
    invoiceName: string;
  }

  export interface InvoiceTemplateProps {
    fontFamily: string;
    header: HeaderProps;
    invoiceInfos: InvoiceInfoProps;
    rewardSummary: RewardsSummaryProps;
    footer: FooterProps;
  }
}

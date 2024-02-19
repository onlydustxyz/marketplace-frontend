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
    destinationAccounts: string[];
  }

  type VATUnion =
    | "VAT_APPLICABLE"
    | "VAT_NOT_APPLICABLE_NON_UE"
    | "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT"
    | "VAT_REVERSE_CHARGE";

  interface Vat {
    vatRegulationState: VATUnion;
    euVATNumber: string;
    rate: string;
  }

  interface Rewards {
    amount: {
      total: number;
      currency: string;
      dollarsEquivalent: number;
    };
    id: string;
    date: string;
    projectName: string;
  }

  export interface HeaderProps {
    title: string;
  }

  export interface InvoiceInfoProps {
    senderInfos: SenderInfo;
    recipientInfos: RecipientInfo;
    legalInfos: LegalInfo;
  }

  export interface InvoiceVatInfoProps {
    vat: Vat;
    totalTax: number;
  }

  export interface RewardsSummaryProps {
    rewards: Rewards[];
    vat: Vat;
    totalBeforeTax: number;
    totalTax: number;
    totalAfterTax: number;
  }

  export interface FooterProps {
    invoiceName: string;
  }

  export interface InvoiceTemplateProps {
    header: HeaderProps;
    invoiceInfos: InvoiceInfoProps;
    rewardSummary: RewardsSummaryProps;
    footer: FooterProps;
  }
}

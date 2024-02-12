import { PendingInvoiceResponse } from "actions/me/me-queries.actions";

export namespace TInvoice {
  interface SenderInfo {
    name: string;
    address: string;
    euVATNumber?: string;
  }

  interface RecipientInfo {
    name: string;
    address: string;
  }

  interface LegalInfo {
    date: string;
    destinationWallets: string[];
  }

  type VATUnion =
    | "VAT_APPLICABLE"
    | "VAT_NOT_APPLICABLE_NON_UE"
    | "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT"
    | "VAT_REVERSE_CHARGE";

  interface Vat {
    specificities: VATUnion;
    euVATNumber: string;
    rate: string;
  }

  export interface Rewards extends PendingInvoiceResponse {}

  export interface HeaderProps {
    title: string;
    invoiceNumber: string;
  }

  export interface InvoiceInfoProps {
    senderInfos: SenderInfo;
    recipientInfos: RecipientInfo;
    legalInfos: LegalInfo;
  }

  export interface RewardsSummaryProps {
    rewards: Rewards;
    vat: Vat;
    total: number;
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

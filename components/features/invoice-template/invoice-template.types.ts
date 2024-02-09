import { PendingInvoiceResponse } from "actions/me/me-queries.actions";

export namespace TInvoice {
  type documentType = "invoice" | "receipt";
  interface SenderInfo {
    name: string;
    address: string;
    justifyEnd?: boolean;
  }

  interface RecipientInfo {
    name: string;
    address: string;
  }

  interface LegalInfo {
    date: string;
    paymentMethod: string;
  }

  export interface Rewards extends PendingInvoiceResponse {}

  export interface HeaderProps {
    type: documentType;
    invoiceNumber: string;
  }

  export interface InvoiceInfoProps {
    senderInfos: SenderInfo;
    recipientInfos: RecipientInfo;
    legalInfos: LegalInfo;
  }

  export interface RewardsSummaryProps {
    rewards: Rewards;
    total: number;
  }

  export interface FooterProps {
    importantNote: string;
    paymentInfo: string;
  }

  export interface InvoiceTemplateProps {
    header: HeaderProps;
    invoiceInfos: InvoiceInfoProps;
    rewardSummary: RewardsSummaryProps;
    footer: FooterProps;
  }
}

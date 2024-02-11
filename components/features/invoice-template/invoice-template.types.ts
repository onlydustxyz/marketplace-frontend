import { PendingInvoiceResponse } from "actions/me/me-queries.actions";

export namespace TInvoice {
  interface SenderInfo {
    name: string;
    address: string;
    fiscalCode: string;
  }

  interface RecipientInfo {
    name: string;
    address: string;
  }

  interface LegalInfo {
    date: string;
    destinationWallets: string[];
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

import { PendingInvoiceResponse } from "actions/me/me-queries.actions";

export namespace TInvoiceTemplate {
  export interface HeaderProps {
    logoUrl: string;
    invoiceNumber: string;
  }

  export interface AddressInfoProps {
    name: string;
    address: string;
    justifyEnd?: boolean;
  }

  export interface InvoiceInfoProps {
    date: string;
  }

  export interface Rewards extends PendingInvoiceResponse {}

  export interface RewardsSummaryProps {
    rewards: Rewards;
    total: number;
  }

  export interface InvoiceProps {
    header: HeaderProps;
    invoiceTo: AddressInfoProps;
    billTo: AddressInfoProps;
    invoiceInfo: InvoiceInfoProps;
    rewards: Rewards;
    total: number;
  }
}

import { InvoicePreviewResponse } from "actions/billing-profiles/billing-profiles-queries.actions";

export namespace TInvoiceBuilders {
  export interface HeaderBuilderProps {
    isSample: string;
    isUserIndividual: boolean;
    invoiceNumber: string;
  }

  export interface InvoiceInfoBuilderProps {
    isUserIndividual: boolean;
    invoiceDetails: InvoicePreviewResponse;
  }

  export interface RewardsSummaryBuilderProps {
    isUserIndividual: boolean;
    invoiceDetails: InvoicePreviewResponse;
  }
}

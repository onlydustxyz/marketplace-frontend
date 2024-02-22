export namespace TUseInvoiceUpload {
  export interface Props {
    billingProfileId: string;
    invoiceId: string;
  }

  export interface HandleSendInvoiceProps {
    fileBlob: Blob | undefined;
    isManualUpload?: boolean;
    fileName?: string;
  }
}

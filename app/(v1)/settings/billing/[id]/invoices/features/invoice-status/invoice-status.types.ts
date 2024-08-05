import { components } from "src/__generated/api";

export namespace TInvoiceStatus {
  export interface InvoiceStatusProps {
    status: components["schemas"]["BillingProfileInvoicesPageItemResponse"]["status"];
  }
}

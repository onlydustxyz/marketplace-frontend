import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TUploadInvoice {
  export interface Props {
    rewardIds: string[];
    billingProfileId: string;
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
  }

  export interface Data {
    uploadInvoice: File;
  }
}

import { MeTypes } from "src/api/me/types";

import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TUploadInvoice {
  export interface Props {
    rewardIds: string[];
    billingProfileId: string;
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
    billingProfileType: MeTypes.billingProfileUnion | undefined;
  }

  export interface Data {
    uploadInvoice: File;
  }
}

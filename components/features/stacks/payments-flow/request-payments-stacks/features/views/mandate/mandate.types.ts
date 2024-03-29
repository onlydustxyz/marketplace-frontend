import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TMandate {
  export interface Props {
    billingProfileId: string;
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
  }
}

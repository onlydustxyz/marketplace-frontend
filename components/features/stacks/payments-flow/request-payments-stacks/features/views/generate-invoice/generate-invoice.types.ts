import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TGenerateInvoice {
  export interface Props {
    rewardIds: string[];
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
  }
}

import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TMandate {
  export interface Props {
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
  }
}

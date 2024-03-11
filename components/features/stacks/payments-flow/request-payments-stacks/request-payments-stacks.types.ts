export namespace TRequestPaymentsStacks {
  export interface onNextViewProps {
    to: Views | "close";
  }
  export enum Views {
    SelectRewards = "SELECT_REWARDS",
    SelectBillingProfile = "SELECT_BILLING_PROFILE",
    Generate = "GENERATE",
    Upload = "UPLOAD",
    Mandate = "MANDATE",
  }
}

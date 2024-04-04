export namespace TManageBillingProfile {
  type ActionTypeUnion = "delete" | "enable" | "disable";
  export interface Props {
    actionType: ActionTypeUnion;
  }
}

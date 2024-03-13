export namespace TManageBillingProfile {
  type ActionTypeUnion = "delete" | "enable" | "disable";
  export interface Props {
    onConfirm: () => void;
    actionType: ActionTypeUnion;
  }
}

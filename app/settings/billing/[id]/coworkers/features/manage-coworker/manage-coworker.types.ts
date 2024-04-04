export namespace TManageCoworker {
  export type ActionTypeUnion = "delete" | "cancel" | "none";
  export interface Props {
    actionType: ActionTypeUnion;
    githubUserId: number;
  }
}

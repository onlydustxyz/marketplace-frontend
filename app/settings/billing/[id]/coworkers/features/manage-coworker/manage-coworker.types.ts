export namespace TManageCoworker {
  export type ActionTypeUnion = "delete" | "cancel" | "disable" | "enable";
  export interface Props {
    actionType: ActionTypeUnion;
    githubUserId: number;
  }
}

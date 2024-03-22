export namespace TManageCoworker {
  export type ActionTypeUnion = "delete" | "cancel";
  export interface Props {
    actionType: ActionTypeUnion;
    githubUserId: number;
  }
}

import { z } from "zod";

import { useApplyIssueDrawerState } from "components/features/apply-issue-drawer/apply-issue-drawer.hooks";

export namespace TApplyIssueDrawer {
  export type ActionType = "create" | "delete";
  export interface Props {
    state: ReturnType<typeof useApplyIssueDrawerState>;
  }

  export const validation = z.object({
    githubComment: z.string().min(1),
  });

  export type form = z.infer<typeof validation>;
}

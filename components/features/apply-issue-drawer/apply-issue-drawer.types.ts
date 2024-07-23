import { z } from "zod";

import { useApplyIssueDrawerState } from "components/features/apply-issue-drawer/apply-issue-drawer.hooks";

export namespace TApplyIssueDrawer {
  export type ActionType = "create" | "update";
  export interface Props {
    state: ReturnType<typeof useApplyIssueDrawerState>;
  }

  export const validation = z.object({
    motivations: z.string().min(1),
    problemSolvingApproach: z.string().optional(),
  });

  export type form = z.infer<typeof validation>;
}

import { z } from "zod";

import { UseProjectGoodFirstIssuesInfiniteListResponse } from "src/api/Project/queries";

export namespace TApplyIssueDrawer {
  export interface Props {
    issue: UseProjectGoodFirstIssuesInfiniteListResponse["issues"][0];
    hasApplied?: boolean;
  }

  export const validation = z.object({
    motivations: z.string().min(1),
    problemSolvingApproach: z.string().optional(),
  });

  export type form = z.infer<typeof validation>;
}

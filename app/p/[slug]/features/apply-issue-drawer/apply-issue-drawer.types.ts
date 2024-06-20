import { UseProjectGoodFirstIssuesInfiniteListResponse } from "src/api/Project/queries";

export namespace TApplyIssueDrawer {
  export interface Props {
    issue: UseProjectGoodFirstIssuesInfiniteListResponse["issues"][0];
    hasApplied?: boolean;
  }
}

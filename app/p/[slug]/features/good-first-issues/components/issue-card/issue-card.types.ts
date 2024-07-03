import { UseProjectGoodFirstIssuesInfiniteListResponse } from "src/api/Project/queries";

export namespace TIssueCard {
  export interface Props {
    issue: UseProjectGoodFirstIssuesInfiniteListResponse["issues"][0];
    onDrawerOpen: () => void;
  }
}

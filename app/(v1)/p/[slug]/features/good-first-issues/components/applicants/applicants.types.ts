import { UseProjectGoodFirstIssuesInfiniteListResponse } from "src/api/Project/queries";

export namespace TApplicants {
  export interface Props {
    applicants: UseProjectGoodFirstIssuesInfiniteListResponse["issues"][0]["applicants"];
  }
}

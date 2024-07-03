import { GetApplicationPageResponse } from "api-client/resources/applications/types";
import { PublicProfilerankCategoryUnion } from "api-client/resources/users/types";

export namespace TApplicantCard {
  export interface Props {
    user: GetApplicationPageResponse["applications"][0]["applicant"];
    selectedUser: number | null;
    applicationId: string;
    handleSelectUser: (githubId: number, applicationId: string) => void;
    rankCategory: PublicProfilerankCategoryUnion;
    rank?: number;
  }
}

import { GetApplicationPageResponse } from "api-client/resources/applications/types";

export namespace TApplicantCard {
  export interface Props {
    user: GetApplicationPageResponse["applications"][0]["applicant"];
    recommandationScore: number;
    selectedUser: number | null;
    applicationId: string;
    handleSelectUser: (githubId: number, applicationId: string) => void;
  }
}

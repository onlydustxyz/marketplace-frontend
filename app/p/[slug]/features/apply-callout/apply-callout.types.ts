import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

export namespace TApplyCallout {
  export interface Props {
    profile: UseGetMyProfileInfoResponse;
    applyToProject: () => void;
    alreadyApplied?: boolean;
  }
}

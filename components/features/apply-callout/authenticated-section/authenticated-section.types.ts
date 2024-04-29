import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { Key } from "hooks/translate/use-translate";

export namespace TApplyAuthenticatedSection {
  export interface Props {
    formDescription?: Key;
    buttonConnected: Key;
    onApply: () => void;
    profile: UseGetMyProfileInfoResponse;
    alreadyApplied?: boolean;
  }
}

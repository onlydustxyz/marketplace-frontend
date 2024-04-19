import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TApplyCallout {
  export interface Props {
    icon: TIcon.Props;
    title: Key;
    description?: Key;
    formDescription?: Key;
    buttonNotConnected: Key;
    buttonConnected: Key;
    profile: UseGetMyProfileInfoResponse;
    applyToProject: () => void;
    alreadyApplied?: boolean;
  }
}

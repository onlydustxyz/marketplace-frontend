import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { Key } from "src/hooks/useIntl";

export namespace TApplyForm {
  export interface UserProfileInfo {
    telegram: string;
    isTelegramPublic: boolean;
  }

  export interface Props {
    formDescription?: Key;
    buttonConnected: Key;
    onApply: () => void;
    profile: UseGetMyProfileInfoResponse;
    setShowForm: (showForm: boolean) => void;
  }
}

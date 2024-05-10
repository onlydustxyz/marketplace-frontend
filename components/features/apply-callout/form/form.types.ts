import { components } from "src/__generated/api";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { Key } from "hooks/translate/use-translate";

export namespace TApplyForm {
  interface ContactProps {
    contact: string;
    isPublic: boolean;
  }

  export interface UserProfileInfo {
    telegram: {
      contact: string;
      isPublic: boolean;
    };
  }

  export type Contact = components["schemas"]["ContactInformation"];

  export interface CreateContactProps extends ContactProps {
    channel: Contact["channel"];
    prefixUrl?: string;
  }

  export interface FormatToSchemaProps {
    oldData: UseGetMyProfileInfoResponse;
    newData: UserProfileInfo;
  }

  export interface Props {
    formDescription?: Key;
    buttonConnected: Key;
    onApply: () => void;
    profile: UseGetMyProfileInfoResponse;
  }
}

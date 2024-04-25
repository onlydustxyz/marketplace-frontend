import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

export namespace TRoleTag {
  export interface Props {
    fallback?: string;
    role?: {
      type: Key;
      icon: TIcon.Props;
    };
    clickable?: boolean;
    isLoading?: boolean;
  }
}

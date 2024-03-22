import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

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

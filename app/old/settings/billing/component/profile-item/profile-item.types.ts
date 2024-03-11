import { PropsWithChildren } from "react";

import { Key } from "src/hooks/useIntl";

export namespace TProfileItem {
  export interface Props extends PropsWithChildren {
    label: Key;
    className?: string;
  }
}

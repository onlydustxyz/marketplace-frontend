import { PropsWithChildren } from "react";

import { Key } from "hooks/translate/use-translate";

export namespace TProfileItem {
  export interface Props extends PropsWithChildren {
    label: Key;
    className?: string;
  }
}

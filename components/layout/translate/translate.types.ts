import { ElementType } from "react";

import { Key } from "src/hooks/useIntl";

export namespace TTranslate {
  export interface Props {
    token: Key;
    as?: ElementType;
    params?: {
      [key: string]: string | number;
    };
  }
}

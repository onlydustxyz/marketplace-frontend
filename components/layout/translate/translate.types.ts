import { Key } from "src/hooks/useIntl";
import { ElementType } from "react";

export namespace TTranslate {
  export interface Props {
    token: Key;
    as?: ElementType;
    params?: {
      [key: string]: string | number;
    };
  }
}

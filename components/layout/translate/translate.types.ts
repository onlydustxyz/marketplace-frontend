import { Key } from "src/hooks/useIntl.tsx";

export namespace TTranslate {
  export interface Props {
    token: Key;
    params?: {
      [key: string]: string | number;
    };
  }
}

import { ElementType } from "react";

import { Key } from "hooks/translate/use-translate";

export namespace TTranslate {
  interface BaseProps {
    token: Key;
    params?: {
      [key: string]: string | number;
    };
  }

  interface PropsWithComponent extends BaseProps {
    as: ElementType;
    className?: string;
  }

  interface PropsWithoutComponent extends BaseProps {
    as?: never;
    className?: never;
  }

  export type Props = PropsWithComponent | PropsWithoutComponent;
}

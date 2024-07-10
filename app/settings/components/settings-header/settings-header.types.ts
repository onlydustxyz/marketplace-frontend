import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { Key } from "hooks/translate/use-translate";

export namespace TSettingsHeader {
  interface BaseProps extends PropsWithChildren {
    icon?: RemixIconsName;
    subtitle: Key;
    individualLimit?: number | null;
  }

  interface TitleProps extends BaseProps {
    title?: string;
    tokenTitle?: never;
  }

  interface TokenTitleProps extends BaseProps {
    title?: never;
    tokenTitle: Key;
  }

  export type Props = TitleProps | TokenTitleProps;
}

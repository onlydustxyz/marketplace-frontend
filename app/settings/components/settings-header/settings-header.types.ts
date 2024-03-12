import { PropsWithChildren } from "react";

import { Key } from "src/hooks/useIntl";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TSettingsHeader {
  interface BaseProps extends PropsWithChildren {
    icon?: RemixIconsName;
    subtitle: Key;
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

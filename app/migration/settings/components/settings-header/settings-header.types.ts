import { PropsWithChildren } from "react";

import { Key } from "src/hooks/useIntl";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TSettingsHeader {
  export interface Props extends PropsWithChildren {
    icon?: RemixIconsName;
    title: Key;
    subtitle: Key;
  }
}

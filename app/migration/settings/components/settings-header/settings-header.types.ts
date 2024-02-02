import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TSettingsHeader {
  export interface Props extends PropsWithChildren {
    icon: RemixIconsName;
    title: string;
    subtitle: string;
  }
}

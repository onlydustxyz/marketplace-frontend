import { PropsWithChildren } from "react";

import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TCardItem {
  export interface Props extends PropsWithChildren {
    label: Key;
    icon: TIcon.Props;
    border?: boolean;
    show?: boolean;
  }
}

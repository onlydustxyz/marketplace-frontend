import { PropsWithChildren } from "react";

import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

export namespace TCardItem {
  export interface Props extends PropsWithChildren {
    label: Key;
    icon: TIcon.Props;
    show?: boolean;
  }
}

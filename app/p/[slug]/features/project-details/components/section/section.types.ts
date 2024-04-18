import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { TTranslate } from "components/layout/translate/translate.types";

export namespace TSection {
  export interface Props extends PropsWithChildren {
    title: TTranslate.Props;
    remixIconName: RemixIconsName;
  }
}

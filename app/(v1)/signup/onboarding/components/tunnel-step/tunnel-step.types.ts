import { PropsWithChildren } from "react";

import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

export namespace TTunnelStep {
  export type stepType = "mandatory" | "optional" | "recommended";
  export interface Props extends PropsWithChildren {
    icon: TIcon.Props;
    title: TTranslate.Props;
    content: TTranslate.Props;
    isDone: boolean;
    type: stepType;
    path: string;
  }
}

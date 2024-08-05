import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TSlider {
  export interface Props {
    children: ReactNode[];
    icon: TIcon.Props;
    title: ReactNode;
  }
}

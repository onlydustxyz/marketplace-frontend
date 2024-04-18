import { PropsWithChildren } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TTrackAccordion {
  export interface Props extends PropsWithChildren {
    icon: TIcon.Props;
    title: string;
    subtitle: string;
  }
}

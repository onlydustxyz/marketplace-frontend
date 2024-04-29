import { TIcon } from "components/layout/icon/icon.types";
import { TTypography } from "components/layout/typography/typography.types";

import { TMostActiveCard } from "./most-active-card/most-active-card.types";

export namespace TMostActiveSection {
  export interface Props {
    icon: TIcon.Props;
    title: TTypography.Props;
    list: TMostActiveCard.Props[];
    wrapperClassName?: string;
  }
}

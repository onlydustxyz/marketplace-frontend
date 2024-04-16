import { ReactNode } from "react";

import { TCard } from "app/hackathons/components/card/card.types";

import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonSection {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: TCard.Props[];
  }
}

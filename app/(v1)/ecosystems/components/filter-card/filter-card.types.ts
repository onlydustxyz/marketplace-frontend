import { ReactNode } from "react";

import { TCard } from "components/ds/card/card.types";

export namespace TFilterCard {
  export interface Props extends Omit<TCard.Props, "className"> {
    icon: ReactNode;
  }
}

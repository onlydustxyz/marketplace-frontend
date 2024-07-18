import { ListHackathon } from "core/domain/hackathon/models/list-hackathon-model";
import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonsSliderContainer {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: ListHackathon[];
  }
}

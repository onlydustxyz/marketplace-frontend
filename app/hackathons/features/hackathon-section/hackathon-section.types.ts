import { ListHackathonInterface } from "core/domain/hackathon/models/list-hackathon-model";
import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonSection {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: ListHackathonInterface[];
  }
}

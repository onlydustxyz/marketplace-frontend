import { ListHackathonsItemResponse } from "api-client/resources/hackathons/types";
import { HackathonStatus } from "core/domain/hackathon/models/hackathon-model";
import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonSection {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: ListHackathonsItemResponse[];
    status: HackathonStatus;
  }
}

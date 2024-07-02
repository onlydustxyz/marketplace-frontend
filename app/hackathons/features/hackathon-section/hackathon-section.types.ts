import { ListHackathonsItemResponse } from "api-client/resources/hackathons/types";
import { ReactNode } from "react";

import { HackathonStatus } from "components/features/hackathons/hackathon-card";
import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonSection {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: ListHackathonsItemResponse[];
    status: HackathonStatus;
    // remove when backend is ready
    startIndex?: number;
  }
}

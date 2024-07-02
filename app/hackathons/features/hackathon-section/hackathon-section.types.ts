import { ListHackathonsItemResponse } from "api-client/resources/hackathons/types";
import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";
import { HackathonStatus } from "components/organisms/hackathon-card";

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

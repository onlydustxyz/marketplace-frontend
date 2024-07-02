import { ListHackathonsItemResponse } from "api-client/resources/hackathons/types";
import { ReactNode } from "react";

import { HackathonStatus } from "components/features/hackathons/hackathon-card";
import { TIcon } from "components/layout/icon/icon.types";

export namespace THackathonsSlider {
  export interface Props {
    icon: TIcon.Props;
    title: ReactNode;
    items: ListHackathonsItemResponse[];
    status: HackathonStatus;
  }
}

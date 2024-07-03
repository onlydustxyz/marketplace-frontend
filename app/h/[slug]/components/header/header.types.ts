import { ProjectLinkResponse } from "api-client/resources/projects/types";
import { ReactNode } from "react";

import { HackathonStatus } from "components/features/hackathons/hackathon-card/hackathon-card.types";

export namespace THeader {
  export interface Props {
    title: string;
    slug?: string;
    location?: ReactNode;
    startDate: string;
    status: HackathonStatus;
    index: number;
    projects?: ProjectLinkResponse[];
  }
}

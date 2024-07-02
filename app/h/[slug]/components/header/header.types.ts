import { ProjectLinkResponse } from "api-client/resources/projects/types";
import { ReactNode } from "react";

import { HackathonStatus } from "components/organisms/hackathon-card";

export namespace THeader {
  export interface Props {
    title: string;
    slug?: string;
    location?: ReactNode;
    startDate: string;
    status: HackathonStatus;
    projects?: ProjectLinkResponse[];
  }
}

import { ProjectLinkResponse } from "api-client/resources/projects/types";
import { HackathonStatus } from "core/domain/hackathon/models/hackathon-model";
import { ReactNode } from "react";

export namespace THeader {
  export interface Props {
    title: string;
    slug?: string;
    location?: ReactNode;
    startDate: string;
    endDate: string;
    status: HackathonStatus;
    index: number;
    projects?: ProjectLinkResponse[];
  }
}

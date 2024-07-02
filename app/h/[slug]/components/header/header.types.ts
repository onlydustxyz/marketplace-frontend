import { ReactNode } from "react";

import { components } from "src/__generated/api";

import { HackathonStatus } from "components/organisms/hackathon-card";

export namespace THeader {
  type Project = components["schemas"]["ProjectLinkResponse"];
  export interface Props {
    title: string;
    slug?: string;
    location?: ReactNode;
    startDate: string;
    status: HackathonStatus;
    projects?: Project[];
  }
}

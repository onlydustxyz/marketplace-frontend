import { HackathonStatus } from "core/domain/hackathon/models/hackathon-model";

export namespace TInfo {
  export interface Link {
    url: string;
    value?: string;
  }

  export interface Sponsor {
    id: string;
    name: string;
    url: string;
    logoUrl: string;
  }

  export interface Props {
    status: HackathonStatus;
    communityLinks: Link[];
    links: Link[];
    totalBudget: string;
    sponsors: Sponsor[];
  }
}

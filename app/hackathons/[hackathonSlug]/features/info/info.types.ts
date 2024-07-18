import { HackathonInterface } from "core/domain/hackathon/models/hackathon-model";

export namespace TInfo {
  export interface Link {
    url: string;
    value?: string;
  }

  export interface Sponsor {
    id: string;
    name: string;
    url?: string | null;
    logoUrl: string;
  }

  export interface Props {
    hackathon: HackathonInterface;
  }
}

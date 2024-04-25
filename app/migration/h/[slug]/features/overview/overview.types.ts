import { components } from "src/__generated/api";

export namespace TOverview {
  export interface Props {
    startDate: string;
    endDate: string;
    totalBudget?: string;
    sponsors: components["schemas"]["SponsorResponse"][];
    links: components["schemas"]["SimpleLink"][];
    projects: components["schemas"]["ProjectLinkResponse"][];
  }
}

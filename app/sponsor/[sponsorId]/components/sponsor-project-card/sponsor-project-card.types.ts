import { components } from "src/__generated/api";

export namespace TSponsorProjectCard {
  export type Props = {
    project: components["schemas"]["ProjectWithBudgetResponse"];
    disableSponsorButton?: boolean;
    initialSponsorId?: string;
  };
}

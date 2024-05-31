import { EcosystemContributor } from "api-client/resources/ecosystems/types";

export namespace TLeaderBoard {
  type SortUnion = "CONTRIBUTION_COUNT" | "TOTAL_EARNED";
  export interface LeaderBoardItemProps {
    contributor: EcosystemContributor;
    sortBy?: SortUnion;
  }
  export interface LeaderBoardProps {
    ecosystemSlug: string;
    className?: string;
    sortBy?: SortUnion;
  }
}

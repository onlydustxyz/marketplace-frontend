import { EcosystemContributor, EcosystemContributorsQueryParams } from "api-client/resources/ecosystems/types";

export namespace TLeaderBoard {
  export interface LeaderBoardItemProps {
    contributor: EcosystemContributor;
    sortBy: EcosystemContributorsQueryParams["sort"];
  }
  export interface LeaderBoardProps {
    ecosystemSlug: string;
    className?: string;
    sortBy: EcosystemContributorsQueryParams["sort"];
  }
}

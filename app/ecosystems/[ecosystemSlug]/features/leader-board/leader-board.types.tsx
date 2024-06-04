import { EcosystemContributor, EcosystemContributorsQueryParams } from "api-client/resources/ecosystems/types";

export namespace TLeaderBoard {
  export interface LeaderBoardSectionProps {
    ecosystemSlug: string;
    className?: string;
  }
  export interface LeaderBoardItemProps {
    contributor: EcosystemContributor;
    sortBy: EcosystemContributorsQueryParams["sort"];
  }
  export interface LeaderBoardProps {
    className?: string;
    sortBy: EcosystemContributorsQueryParams["sort"];
    contributors: EcosystemContributor[];
  }
}

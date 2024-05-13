import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export namespace THackathonImageMetadataProps {
  export interface Props {
    title: string;
    login: string;
    image: string;
    topLanguages?: {
      name: string;
      image: string;
    };
    topEcosystem?: {
      name: string;
      image: string;
    };
    data: {
      [key: string]: {
        level: TActivityGraph.level;
        reward?: boolean;
      };
    };
  }
}

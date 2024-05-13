import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

export namespace THackathonImageMetadataProps {
  export interface Props {
    name: string;
    dates: string;
    location: string;
    data: {
      [key: string]: {
        level: TActivityGraph.level;
        reward?: boolean;
      };
    };
  }
}

import { PublicProfilerankCategoryUnion } from "api-client/resources/users/types";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";

import { Key } from "hooks/translate/use-translate";

export namespace TPublicProfileImageMetadata {
  export interface Props {
    title: string;
    login: string;
    image: string;
    contributionCount: number;
    rewardsCount: number;
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

  export const rankCategoryTranslationMapping: Record<PublicProfilerankCategoryUnion, Key> = {
    A: "💎 Diamond contributor",
    B: "🥇 Gold contributor",
    C: "🥈 Silver contributor",
    D: "🥉 Silver contributor",
    E: "🔨 Steel contributor",
    F: "🪵 Wood contributor",
  };
}

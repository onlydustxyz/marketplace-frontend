import { PublicProfilerankCategoryUnion } from "api-client/resources/users/types";

export namespace TRankCategory {
  export interface Props {
    rankCategory?: PublicProfilerankCategoryUnion;
    hasPopover?: boolean;
  }
}

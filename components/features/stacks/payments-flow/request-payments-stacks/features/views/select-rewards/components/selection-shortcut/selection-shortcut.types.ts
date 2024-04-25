import { components } from "src/__generated/api";

export namespace TSelectionShortcut {
  export interface Props {
    excludedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    includedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    onExcludeAll: () => void;
    onIncludeAll: () => void;
  }
}

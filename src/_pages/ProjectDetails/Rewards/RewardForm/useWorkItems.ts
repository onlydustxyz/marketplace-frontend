import { sortBy, uniqBy } from "lodash";
import { useCallback, useReducer } from "react";
import { RewardableWorkItem } from "./WorkItemSidePanel/WorkItems/WorkItems";

type WorkItemAction =
  | {
      action: "add";
      workItem: RewardableWorkItem | RewardableWorkItem[];
    }
  | {
      action: "remove";
      workItem: RewardableWorkItem;
    }
  | {
      action: "clear";
    };

function workItemsReducer(workItems: RewardableWorkItem[], action: WorkItemAction) {
  switch (action.action) {
    case "add":
      return sortBy(uniqBy([...workItems, ...[action.workItem].flat()], "id"), "createdAt").reverse();
    case "remove":
      return workItems.filter(w => w !== action.workItem);
    case "clear":
      return [];
  }
}

export default function useWorkItems() {
  const [workItems, dispatchWorkItems] = useReducer(workItemsReducer, []);

  const add = useCallback(
    (workItem: RewardableWorkItem | RewardableWorkItem[]) => dispatchWorkItems({ action: "add", workItem }),
    []
  );
  const remove = useCallback((workItem: RewardableWorkItem) => dispatchWorkItems({ action: "remove", workItem }), []);
  const clear = useCallback(() => dispatchWorkItems({ action: "clear" }), []);

  return { workItems, add, remove, clear };
}

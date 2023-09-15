import { sortBy, uniqBy } from "lodash";
import { useCallback, useReducer } from "react";
import { WorkItemFragment } from "src/__generated/graphql";

type WorkItemAction =
  | {
      action: "add";
      workItem: WorkItemFragment | WorkItemFragment[];
    }
  | {
      action: "remove";
      workItem: WorkItemFragment;
    }
  | {
      action: "clear";
    };

function workItemsReducer(workItems: WorkItemFragment[], action: WorkItemAction) {
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
    (workItem: WorkItemFragment | WorkItemFragment[]) => dispatchWorkItems({ action: "add", workItem }),
    []
  );
  const remove = useCallback((workItem: WorkItemFragment) => dispatchWorkItems({ action: "remove", workItem }), []);
  const clear = useCallback(() => dispatchWorkItems({ action: "clear" }), []);

  return { workItems, add, remove, clear };
}

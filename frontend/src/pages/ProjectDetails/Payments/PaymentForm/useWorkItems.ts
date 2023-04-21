import { sortBy, uniqBy } from "lodash";
import { useCallback, useReducer } from "react";
import { WorkItem } from "src/components/GithubIssue";

type WorkItemAction =
  | {
      action: "add" | "remove";
      workItem: WorkItem;
    }
  | {
      action: "clear";
    };

function workItemsReducer(workItems: WorkItem[], action: WorkItemAction) {
  switch (action.action) {
    case "add":
      return sortBy(uniqBy([...workItems, action.workItem], "id"), "createdAt").reverse();
    case "remove":
      return workItems.filter(w => w !== action.workItem);
    case "clear":
      return [];
  }
}

export default function useWorkItems() {
  const [workItems, dispatchWorkItems] = useReducer(workItemsReducer, []);

  const add = useCallback((workItem: WorkItem) => dispatchWorkItems({ action: "add", workItem }), []);
  const remove = useCallback((workItem: WorkItem) => dispatchWorkItems({ action: "remove", workItem }), []);
  const clear = useCallback(() => dispatchWorkItems({ action: "clear" }), []);

  return { workItems, add, remove, clear };
}

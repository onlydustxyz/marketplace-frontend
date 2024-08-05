import { ActivityItem } from "app/(v1)/(home)/features/activity/activity.hooks";

export namespace TActivityViewerItem {
  export interface Props {
    index: number;
    lastElement: boolean;
    data: ActivityItem;
  }
}

import { ActivityItem } from "app/home/features/activity/activity.hooks";

export namespace TActivityViewerItem {
  export interface Props {
    index: number;
    data: ActivityItem;
  }
}

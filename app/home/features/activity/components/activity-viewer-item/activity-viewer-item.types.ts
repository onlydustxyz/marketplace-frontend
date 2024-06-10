import { ActivityItem } from "app/home/features/activity/activity.hooks";

export namespace TActivityViewerItem {
  export interface Props extends ActivityItem {
    index: number;
  }
}

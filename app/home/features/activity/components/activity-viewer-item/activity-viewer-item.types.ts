import { ActivityAnimationState } from "app/home/features/activity/activity.hooks";

export namespace TActivityViewerItem {
  export interface Props {
    name: string;
    state: ActivityAnimationState;
    index: number;
  }
}

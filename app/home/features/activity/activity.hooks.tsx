"use client";

import { useRef, useState } from "react";

import { useRequestAnimationFrame } from "hooks/animations/use-request-animation-frame";

export enum ActivityAnimationState {
  Enter = "enter",
  Exit = "exit",
  Visible = "visible",
  Hidden = "hidden",
}
type activityItem = { name: string; state: ActivityAnimationState };
const MAX_ACTIVITY = 5;
export function useActivity() {
  const stocks = useRef<activityItem[]>([
    { name: "Activity6", state: ActivityAnimationState.Enter },
    { name: "Activity7", state: ActivityAnimationState.Enter },
    { name: "Activity8", state: ActivityAnimationState.Enter },
    { name: "Activity9", state: ActivityAnimationState.Enter },
    { name: "Activity10", state: ActivityAnimationState.Enter },
  ]);

  const [activityItem, setActivityItem] = useState<activityItem[]>([
    { name: "Activity1", state: ActivityAnimationState.Enter },
    { name: "Activity2", state: ActivityAnimationState.Enter },
    { name: "Activity3", state: ActivityAnimationState.Enter },
    { name: "Activity4", state: ActivityAnimationState.Enter },
    { name: "Activity5", state: ActivityAnimationState.Enter },
  ]);

  const addActivityItem = () => {
    const newActivityItem = stocks.current.shift();
    if (newActivityItem) {
      setActivityItem(prev => {
        const newActivity = [...prev.map(p => ({ ...p, state: ActivityAnimationState.Enter })).slice(0, MAX_ACTIVITY)];
        newActivity.unshift(newActivityItem);
        newActivity[MAX_ACTIVITY].state = ActivityAnimationState.Exit;
        return newActivity;
      });
    }
  };

  useRequestAnimationFrame(
    () => {
      console.log("ADD ACTIVITY ITEM");
      addActivityItem();
    },
    5000,
    false
  );

  console.log("activityItem : ", activityItem, "stocks : ", stocks.current);

  return {
    items: activityItem,
  };
}

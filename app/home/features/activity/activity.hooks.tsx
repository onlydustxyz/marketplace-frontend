"use client";

import { useRef, useState } from "react";

import { useRequestAnimationFrame } from "hooks/animations/use-request-animation-frame";

type activityItem = { name: string; exit: boolean; enter: boolean; visible: boolean };
const MAX_ACTIVITY = 5;
export function useActivity() {
  const stocks = useRef<activityItem[]>([
    { name: "Activity6", exit: false, enter: false, visible: false },
    { name: "Activity7", exit: false, enter: false, visible: false },
    { name: "Activity8", exit: false, enter: false, visible: false },
    { name: "Activity9", exit: false, enter: false, visible: false },
    { name: "Activity10", exit: false, enter: false, visible: false },
  ]);

  const [activityItem, setActivityItem] = useState<activityItem[]>([
    { name: "Activity1", exit: false, enter: false, visible: true },
    { name: "Activity2", exit: false, enter: false, visible: true },
    { name: "Activity3", exit: false, enter: false, visible: true },
    { name: "Activity4", exit: false, enter: false, visible: true },
    { name: "Activity5", exit: false, enter: false, visible: true },
  ]);

  const addActivityItem = () => {
    const newActivityItem = stocks.current.shift();
    if (newActivityItem) {
      setActivityItem(prev => {
        const newActivity = [...prev.slice(0, MAX_ACTIVITY + 1)];
        newActivity.unshift({ ...newActivityItem, enter: true, visible: true });
        newActivity[MAX_ACTIVITY].exit = true;
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
    true
  );

  console.log("activityItem : ", activityItem, "stocks : ", stocks.current);

  return {
    activity: "Activity",
  };
}

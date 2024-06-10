"use client";

import { useRef, useState } from "react";

import { useRequestAnimationFrame } from "hooks/animations/use-request-animation-frame";

type activityItem = { name: string };
export function useActivity() {
  const stocks = useRef<activityItem[]>([
    { name: "Activity2" },
    { name: "Activity3" },
    { name: "Activity4" },
    { name: "Activity5" },
  ]);

  const [activityItem, setActivityItem] = useState<activityItem[]>([{ name: "Activity1" }]);
  useRequestAnimationFrame(() => {
    console.log("ANIMATE !");
  }, 5000);

  return {
    activity: "Activity",
  };
}

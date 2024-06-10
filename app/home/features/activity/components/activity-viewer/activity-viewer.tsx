"use client";

import { AnimatePresence } from "framer-motion";

import { useActivity } from "app/home/features/activity/activity.hooks";
import { ActivityViewerItem } from "app/home/features/activity/components/activity-viewer-item/activity-viewer-item";

import { TActivityViewer } from "./activity-viewer.types";

export function ActivityViewer(_: TActivityViewer.Props) {
  const { items } = useActivity();
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {items.map((data, key) => (
          <ActivityViewerItem key={`${data.type}-${data.timestamp}`} {...data} index={key} />
        ))}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useActivity } from "app/home/features/activity/activity.hooks";
import { ActivityViewerItemAnimation } from "app/home/features/activity/components/activity-viewer-item/activity-viewer-item.animation";

import { TActivityViewer } from "./activity-viewer.types";

export function ActivityViewer(_: TActivityViewer.Props) {
  const { items } = useActivity();
  return (
    <motion.div className="flex flex-col gap-4" layout transition={{ type: "spring", stiffness: 100 }}>
      <AnimatePresence initial={false}>
        {items.map((data, key) => (
          <ActivityViewerItemAnimation key={`${data.type}-${data.timestamp}`} data={data} index={key} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";

import { useActivity } from "app/(v1)/(home)/features/activity/activity.hooks";
import { ActivityViewerItemAnimation } from "app/(v1)/(home)/features/activity/components/activity-viewer-item/activity-viewer-item.animation";

import { TActivityViewer } from "./activity-viewer.types";

export function ActivityViewer(_: TActivityViewer.Props) {
  const { items } = useActivity();
  return (
    <LazyMotion features={domMax} strict>
      <m.div className="flex flex-col gap-4" layout transition={{ type: "spring", stiffness: 50 }}>
        <AnimatePresence initial={false}>
          {items.map((data, key) => (
            <ActivityViewerItemAnimation
              key={`${data.type}-${data.timestamp}`}
              data={data}
              index={key}
              lastElement={key >= 3}
            />
          ))}
        </AnimatePresence>
      </m.div>
    </LazyMotion>
  );
}

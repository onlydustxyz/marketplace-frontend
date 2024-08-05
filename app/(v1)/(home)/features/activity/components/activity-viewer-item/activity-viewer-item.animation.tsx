import { Variants, m, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { ActivityAnimationState } from "app/(v1)/(home)/features/activity/activity.hooks";
import { ActivityViewerItem } from "app/(v1)/(home)/features/activity/components/activity-viewer-item/activity-viewer-item";

import { TActivityViewerItem } from "./activity-viewer-item.types";

export function ActivityViewerItemAnimation({ data, index, lastElement }: TActivityViewerItem.Props) {
  const { state } = data;
  const controls = useAnimation();
  const delay = useMemo(() => index * 0.1, [index]);
  const transition = useMemo(
    () => ({
      type: "spring",
      stiffness: 100,
    }),
    [delay]
  );
  const storedIndex = useRef(index);

  useEffect(() => {
    if (controls && state) {
      if (index !== storedIndex.current) {
        controls?.start({
          scale: 0.97,
          transition,
        });
        if (state !== ActivityAnimationState.Exit) {
          setTimeout(() => {
            controls?.start(animate[ActivityAnimationState.Enter]);
            storedIndex.current = index;
          }, 300);
        }
      }
    }
  }, [index, state, controls]);

  useEffect(() => {
    if (state && controls) {
      controls?.start(state);
    }
  }, [state, controls]);

  const animate: Variants = {
    [ActivityAnimationState.Hidden]: () => ({
      opacity: 0,
      y: -20,
      scale: 1.2,
      maxHeight: 0,
      transition: {
        delay,
        ...transition,
      },
    }),
    [ActivityAnimationState.Exit]: () => ({
      opacity: 0,
      y: 10,
      scale: 0.9,
      transition: {
        delay: 0.1,
        ...transition,
      },
    }),
    [ActivityAnimationState.Enter]: () => ({
      opacity: 1,
      y: 0,
      maxHeight: "120px",
      x: 0,
      scale: 1,
      transition: {
        delay,
        ...transition,
      },
    }),
  };

  return (
    <m.div
      variants={animate}
      animate={controls}
      transition={{ type: "spring", stiffness: 100 }}
      initial={ActivityAnimationState.Hidden}
      exit={ActivityAnimationState.Exit}
    >
      <ActivityViewerItem data={data} index={index} lastElement={lastElement} />
    </m.div>
  );
}

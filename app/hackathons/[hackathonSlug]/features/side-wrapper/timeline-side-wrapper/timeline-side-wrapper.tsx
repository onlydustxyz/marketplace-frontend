"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { TTimelineSideWrapper } from "./timeline-side-wrapper.types";

export function TimelineSideWrapper({ children }: TTimelineSideWrapper.Props) {
  const {
    timeline: { isOpen },
    panelSize,
  } = useContext(HackathonContext);

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.aside
          className="scrollbar-sm absolute bottom-0 right-0 top-0 h-full overflow-auto pl-4"
          style={{ width: panelSize.panels.timeline }}
          initial={{ translate: "100%" }}
          animate={{ translate: 0 }}
          exit={{ translate: "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <div className="h-auto">{children}</div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

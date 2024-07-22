"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { TIssuesSideWrapper } from "./issues-side-wrapper.types";

export function IssuesSideWrapper({ children }: TIssuesSideWrapper.Props) {
  const {
    issues: { isOpen },
    panelSize,
  } = useContext(HackathonContext);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          className="scrollbar-sm absolute bottom-0 right-0 top-0 h-full overflow-auto pl-4"
          style={{ width: panelSize.panels.issues }}
          initial={{ translate: "100%", opacity: 0 }}
          animate={{ translate: 0, opacity: 1 }}
          exit={{ translate: "100%", opacity: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <div className="h-auto">{children}</div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

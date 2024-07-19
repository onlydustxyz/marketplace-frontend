"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonIssuesContext } from "../../context/hackathon-issues.context";
import { TSideWrapper } from "./side-wrapper.types";

export function SideWrapper({ children }: TSideWrapper.Props) {
  const {
    drawer: { isOpen },
  } = useContext(HackathonIssuesContext);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          className="flex-1"
          initial={{ width: 0 }}
          animate={{ width: "40%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div>{children}</motion.div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

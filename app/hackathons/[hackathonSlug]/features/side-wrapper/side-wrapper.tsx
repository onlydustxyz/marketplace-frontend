"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { TSideWrapper } from "./side-wrapper.types";

export function SideWrapper({ children }: TSideWrapper.Props) {
  const {
    issues: { isOpen },
  } = useContext(HackathonContext);

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

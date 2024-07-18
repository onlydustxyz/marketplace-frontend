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
          className="w-0 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "40%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <motion.div>{children}</motion.div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

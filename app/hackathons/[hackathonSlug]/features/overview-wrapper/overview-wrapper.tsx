"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonIssuesContext } from "../../context/hackathon-issues.context";
import { TOverviewWrapper } from "./overview-wrapper.types";

export function OverviewWrapper({ children }: TOverviewWrapper.Props) {
  const {
    drawer: { isOpen },
  } = useContext(HackathonIssuesContext);

  return (
    <AnimatePresence>
      <motion.div className="w-full" animate={{ width: isOpen ? "60%" : "100%" }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

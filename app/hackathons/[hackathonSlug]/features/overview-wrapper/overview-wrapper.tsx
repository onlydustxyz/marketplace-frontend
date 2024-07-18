"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { TOverviewWrapper } from "./overview-wrapper.types";

export function OverviewWrapper({ children }: TOverviewWrapper.Props) {
  const { panelSize } = useContext(HackathonContext);

  return (
    <AnimatePresence>
      <motion.div
        style={{ width: panelSize.container }}
        animate={{ width: panelSize.container }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

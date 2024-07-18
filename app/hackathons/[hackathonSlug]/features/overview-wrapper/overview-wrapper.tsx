"use client";

import { motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { TOverviewWrapper } from "./overview-wrapper.types";

export function OverviewWrapper({ children }: TOverviewWrapper.Props) {
  const {
    issues: { isOpen },
  } = useContext(HackathonContext);

  return (
    <motion.div
      className="w-full"
      animate={{ width: isOpen ? "60%" : "100%" }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { TScrollableView } from "./scrollable-view.types";

export function ScrollableView({ children }: TScrollableView.Props) {
  const scrollRef = useRef(null);
  return (
    <div className={"px-6"}>
      <motion.div className="sticky top-0 h-[254px] w-full" initial="h-[254px]">
        {children[0]}
      </motion.div>
      {children[1]}
      <div className="scrollbar-sm w-full overflow-y-auto" ref={scrollRef}>
        {children[2]}
      </div>
    </div>
  );
}

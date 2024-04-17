"use client";

import { motion, useScroll } from "framer-motion";

import { TScrollableHeader } from "./scrollable-header.types";

export function ScrollableHeader({ children, scrollRef }: TScrollableHeader.Props) {
  const { scrollXProgress } = useScroll({ container: scrollRef });
  console.log("scrollX", scrollXProgress);
  return (
    // <motion.div className="sticky top-0 w-full" initial="h-[120px]" whileInView="h-[254px]">
    <motion.div className="sticky top-0 h-[254px] w-full" initial="h-[254px]">
      {children}
    </motion.div>
  );
}

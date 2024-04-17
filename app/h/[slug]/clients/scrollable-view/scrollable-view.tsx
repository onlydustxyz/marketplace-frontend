"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { TScrollableView } from "./scrollable-view.types";

const scrollValue = {
  full: 254 - 32,
  compact: 120 - 32,
};
export function ScrollableView({ children }: TScrollableView.Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (e.currentTarget) {
        const target = e.currentTarget as HTMLElement;
        if (target.scrollTop > 10) {
          setIsHeaderCompact(true);
        } else {
          setIsHeaderCompact(false);
        }
      }
    };
    scrollRef?.current?.removeEventListener("scroll", onScroll);
    scrollRef?.current?.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  return (
    <div className={"flex h-full w-full flex-col overflow-hidden px-6"}>
      <motion.div
        className="sticky top-0 w-full"
        initial="full"
        animate={isHeaderCompact ? "compact" : "full"}
        variants={{
          full: { height: scrollValue.full },
          compact: { height: scrollValue.compact },
        }}
      >
        {children[0]}
      </motion.div>
      {children[1]}
      <div className="scrollbar-sm relative w-full flex-1 overflow-y-scroll" ref={scrollRef}>
        {children[2]}
      </div>
    </div>
  );
}

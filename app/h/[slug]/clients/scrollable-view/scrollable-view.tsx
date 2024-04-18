"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { TScrollableView } from "./scrollable-view.types";

const scrollValue = {
  full: 254,
  compact: 120 - 32,
  navigation: 56,
};

export function ScrollableView({ children }: TScrollableView.Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (e.currentTarget) {
        const target = e.currentTarget as HTMLElement;
        if (target.scrollTop >= scrollValue.compact - scrollValue.navigation) {
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
    <div
      className={"scrollbar-sm group flex h-full w-full flex-col overflow-y-scroll px-2 md:px-6"}
      data-header-compact={isHeaderCompact}
      ref={scrollRef}
    >
      <div className="sticky top-0 z-10 w-full">
        <div className="w-full" style={{ height: scrollValue.full + scrollValue.navigation }}>
          <motion.div
            className="w-full"
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
        </div>
      </div>
      <div className="relative w-full" ref={scrollRef}>
        {children[2]}
        <div className="h-[134px] w-full" />
      </div>
    </div>
  );
}

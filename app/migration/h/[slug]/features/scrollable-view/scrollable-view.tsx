"use client";

import { useEffect, useRef, useState } from "react";

import { TScrollableView } from "./scrollable-view.types";

const scrollValue = {
  full: 254,
  compact: 120 - 32,
  navigation: 56,
  shouldHideContent: 177,
};

export function ScrollableView({ children }: TScrollableView.Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [headerValue, setHeaderValue] = useState(scrollValue.full);

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (e.currentTarget) {
        const target = e.currentTarget as HTMLElement;
        const headerValue = scrollValue.full - target.scrollTop;
        setHeaderValue(headerValue <= scrollValue.compact ? scrollValue.compact : headerValue);
      }
    };
    scrollRef?.current?.removeEventListener("scroll", onScroll);
    scrollRef?.current?.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  return (
    <div
      className={"scrollbar-sm group flex h-full w-full flex-col overflow-y-scroll px-2 md:px-6"}
      data-header-compact={headerValue <= scrollValue.shouldHideContent}
      ref={scrollRef}
    >
      <div className="pointer-events-none sticky top-0 z-10 w-full">
        <div className="w-full" style={{ height: scrollValue.full + scrollValue.navigation }}>
          <div className="w-full" style={{ height: headerValue }}>
            {children[0]}
          </div>
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

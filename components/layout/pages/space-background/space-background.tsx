"use client";

import { createPortal } from "react-dom";

import { cn } from "src/utils/cn";

export function SpaceBackground() {
  return createPortal(<div className={cn("fixed inset-0 -z-[1] bg-space bg-no-repeat")} />, document.body);
}

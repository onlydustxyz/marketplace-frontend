"use client";

import { createPortal } from "react-dom";

import { cn } from "src/utils/cn";

export function SpaceBackground() {
  return createPortal(<div className={cn("fixed inset-0 bg-space-new bg-no-repeat")} />, document.body);
}

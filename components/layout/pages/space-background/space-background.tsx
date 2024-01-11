"use client";

import { cn } from "src/utils/cn.ts";
import { createPortal } from "react-dom";

export function SpaceBackground() {
  return (
    <>
      {createPortal(
        <div className={cn("fixed left-0 right-0 top-0 -z-[1] h-full w-full bg-space bg-no-repeat")} />,
        document.body
      )}
    </>
  );
}

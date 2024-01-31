"use client";

import { createPortal } from "react-dom";

import { cn } from "src/utils/cn";

export function SpaceBackground() {
  return (
    <>
      {createPortal(
        <div className={cn("fixed left-0 right-0 top-0 -z-[1] h-full w-full bg-space-new bg-no-repeat")} />,
        document.body
      )}
    </>
  );
}

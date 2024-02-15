"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import SidePanel from "src/components/SidePanel";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { TSidebar } from "components/layout/sidebar/sidebar.types";

export function Sidebar({ children, mobileHeader }: TSidebar.Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [panelOpen, setPanelOpen] = useState(false);

  function openPanel() {
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  if (isXl) {
    return (
      <div
        className={cn(
          "relative z-[1] flex w-80 shrink-0 flex-col overflow-hidden rounded-l-2xl bg-white/4 bg-noise-medium px-8 py-6 font-walsheim",
          "before:absolute before:inset-0 before:-z-[2] before:bg-black",
          "after:absolute after:inset-0 after:-z-[1] after:bg-white/4 after:bg-noise-medium"
        )}
      >
        {children({})}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6">
        {mobileHeader ?? <div />}

        <Button iconOnly variant={"secondary"} size="s" onClick={openPanel}>
          <Icon remixName="ri-menu-line" />
        </Button>
      </div>
      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom" isMenu>
        <div className="flex w-full flex-col bg-white/4 bg-noise-medium px-8 py-6 font-walsheim">
          {children({ closePanel })}
        </div>
      </SidePanel>
    </>
  );
}

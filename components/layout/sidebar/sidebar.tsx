"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import BurgerIcon from "src/assets/icons/BurgerIcon";
import SidePanel from "src/components/SidePanel";
import { viewportConfig } from "src/config";

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
      <div className="flex w-80 shrink-0 flex-col rounded-l-2xl bg-white/4 bg-noise-medium px-8 py-6 font-walsheim">
        {children({})}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6">
        {mobileHeader ?? <div />}

        <button className="rounded-lg border p-2" onClick={openPanel}>
          {/* TODO use <Icon/> */}
          <BurgerIcon />
        </button>
      </div>
      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom" isMenu>
        <div className="flex w-full flex-col bg-white/4 bg-noise-medium px-8 py-6 font-walsheim">
          {children({ closePanel })}
        </div>
      </SidePanel>
    </>
  );
}

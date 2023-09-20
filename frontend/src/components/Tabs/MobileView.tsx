import { useState } from "react";
import classNames from "classnames";

import ChevronDown from "src/assets/icons/ChevronDown";
import SidePanel from "src/components/SidePanel";
import type { Tab } from "src/components/Tabs/Tabs";

export function MobileView({ tabs, title }: { tabs: Tab[]; title?: string }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const activeTab = tabs.find(tab => tab.active);
  const activeTabIndex = tabs.findIndex(tab => tab.active);

  return (
    <>
      <button type="button" className="flex items-center gap-1 font-belwe text-2xl" onClick={() => setPanelOpen(true)}>
        <span>{activeTab?.children}</span>
        <ChevronDown className="text-spacePurple-500" />
      </button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="bg-whiteFakeOpacity-5 p-4">
          {title ? <p className="px-2 pb-4 pt-6 font-belwe text-2xl text-greyscale-50">{title}</p> : null}
          <div className="flex flex-col divide-y divide-greyscale-50/8 font-walsheim text-sm">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                className={classNames("flex items-center gap-3 p-4", {
                  "is-active rounded-xl bg-white/8": tab.active,
                })}
                onClick={() => {
                  tab.onClick();
                  setPanelOpen(false);
                }}
                hidden={tab.active || (activeTabIndex !== 0 && activeTabIndex === i - 1)}
              >
                {tab.children}
              </button>
            ))}
          </div>
        </div>
      </SidePanel>
    </>
  );
}

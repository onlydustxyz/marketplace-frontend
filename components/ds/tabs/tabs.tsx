"use client";

import { Tabs as NextTabs } from "@nextui-org/react";
import { Tab as NextTab } from "@nextui-org/tabs";
import { usePathname, useRouter } from "next/navigation";
import { Key, useMemo, useState } from "react";
import { useLocation } from "react-use";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { tabsVariants } from "components/ds/tabs/tabs.variants";

import { Tab } from "./tab/tab";
import { TTabs } from "./tabs.types";

export function Tabs<T extends Key>({ tabs, color, border, mobile, controlled, isHref }: TTabs.Props<T>) {
  const [selected, setSelected] = useState<Key>(tabs[0]?.key);
  const slots = tabsVariants({ border });
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const [openMobilePanel, setOpenMobilePanel] = useState(false);
  const pathname = usePathname();
  const location = useLocation();
  const router = useRouter();
  function onSelectTab(tab: Key) {
    if (controlled) {
      controlled.onSelect(tab as T);
    } else if (isHref) {
      router.push(tab.toString());
    } else {
      setSelected(tab);
    }
  }

  const selectedTab = useMemo(() => {
    if (controlled?.selected) {
      return controlled.selected;
    }

    if (isHref) {
      return `${pathname}${window?.location?.hash || ""}`;
    }

    return selected;
  }, [pathname, controlled?.selected, location]);

  const getSelectedChildren = useMemo(() => {
    if (controlled?.selected) {
      return tabs.find(tab => tab.key === controlled.selected)?.children?.(controlled.selected);
    }
    if (selected) {
      return tabs.find(tab => tab.key === selected)?.children?.(selected as T);
    }

    return tabs[0]?.children?.(selected as T);
  }, [controlled, selected, tabs]);

  if (!isXl && mobile) {
    return (
      <>
        <div className="cursor-pointer" onClick={() => setOpenMobilePanel(true)}>
          {mobile.trigger}
        </div>
        <BottomSheet
          background={color}
          onClose={() => setOpenMobilePanel(false)}
          open={openMobilePanel}
          title={mobile.title}
          hasCloseButton={false}
        >
          {tabs.map(({ key, ...tab }, i) => (
            <button
              key={i}
              type="button"
              className={cn("flex items-center gap-3 p-4", {
                "is-active rounded-xl bg-white/8": selected === key,
              })}
              onClick={() => {
                onSelectTab(key);
                setOpenMobilePanel(false);
              }}
            >
              <Tab color={color} {...tab} key={key} />
            </button>
          ))}
        </BottomSheet>
      </>
    );
  }

  return (
    <>
      <NextTabs
        variant="underlined"
        selectedKey={selectedTab}
        onSelectionChange={onSelectTab}
        classNames={{
          base: "w-full",
          tabList: cn("gap-8 w-full relative rounded-none p-0 px-4", slots.tabList()),
          cursor: "w-full bg-underline h-1 bg-cover bg-no-repeat",
          tab: "relative max-w-fit px-0 h-auto pt-[2px] pb-2.5 data-[hover=true]:opacity-100",
        }}
      >
        {tabs.map(({ children: _c, key, content, ...t }) => (
          <NextTab {...t} key={key} title={<Tab color={color} content={content} {...t} key={key} />} />
        ))}
      </NextTabs>
      {getSelectedChildren ? <div className="h-3 w-full" /> : null}
      {getSelectedChildren}
    </>
  );
}

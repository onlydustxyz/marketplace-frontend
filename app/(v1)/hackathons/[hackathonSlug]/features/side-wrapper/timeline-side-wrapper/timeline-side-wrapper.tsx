"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/(v1)/hackathons/[hackathonSlug]/context/hackathon.context";

import { viewportConfig } from "src/config";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";
import { Drawer } from "components/molecules/drawer";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

import { TTimelineSideWrapper } from "./timeline-side-wrapper.types";

export function TimelineSideWrapper({ children }: TTimelineSideWrapper.Props) {
  const isXl = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.xl}px)`);

  const {
    timeline: { isOpen, close },
    panelSize,
  } = useContext(HackathonContext);

  function handleDrawerOpen() {
    if (isOpen) {
      close();
    }
  }

  return (
    <>
      {!isXl ? (
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.aside
              className="scrollbar-sm absolute bottom-0 right-0 top-0 h-full max-h-[1054px] overflow-y-auto overflow-x-hidden pl-4"
              style={{ width: panelSize.panels.timeline }}
              initial={{ translate: "100%", opacity: 0 }}
              animate={{ translate: 0, opacity: 1 }}
              exit={{ translate: "100%", opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <Paper size="m" container="3" classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
                <Typo variant="brand" size={"xl"} classNames={{ base: "hidden xl:block" }}>
                  <Translate token="v2.pages.hackathons.details.timeline.title" />
                </Typo>
                {children}
              </Paper>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      ) : (
        <Drawer
          isOpen={isOpen}
          onOpenChange={handleDrawerOpen}
          header={{
            startContent: (
              <Typo size={"m"} variant="brand" translate={{ token: "v2.pages.hackathons.details.timeline.title" }} />
            ),
          }}
        >
          <div className="h-auto">{children}</div>
        </Drawer>
      )}
    </>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { TProjectSideWrapper } from "app/hackathons/[hackathonSlug]/features/side-wrapper/project-side-wrapper/project-side-wrapper.types";

import { viewportConfig } from "src/config";

import { Paper } from "components/atoms/paper";
import { Drawer } from "components/molecules/drawer";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function ProjectSideWrapper({ children }: TProjectSideWrapper.Props) {
  const isXl = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.xl}px)`);

  const {
    project: { isOpen, close },
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
        <AnimatePresence>
          {isOpen ? (
            <motion.aside
              className="scrollbar-sm absolute bottom-0 right-0 top-0 h-full max-h-[1054px] overflow-y-auto overflow-x-hidden pl-4"
              style={{ width: panelSize.panels.project }}
              initial={{ translate: "100%", opacity: 0 }}
              animate={{ translate: 0, opacity: 1 }}
              exit={{ translate: "100%", opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <Paper size="m" container="2" classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
                {children}
              </Paper>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      ) : (
        <Drawer isOpen={isOpen} onOpenChange={handleDrawerOpen} hideHeader>
          <div className="flex h-auto flex-col gap-3 pt-2">{children}</div>
        </Drawer>
      )}
    </>
  );
}

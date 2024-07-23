"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context";

import { viewportConfig } from "src/config";

import { Paper } from "components/atoms/paper";
import { Drawer } from "components/molecules/drawer";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

import { TIssuesSideWrapper } from "./issues-side-wrapper.types";

export function IssuesSideWrapper({ children }: TIssuesSideWrapper.Props) {
  const isXl = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.xl}px)`);

  const {
    issues: { isOpen, close },
    panelSize,
  } = useContext(HackathonContext);

  const {
    filters: { clear },
  } = useContext(HackathonIssuesContext);

  function handleDrawerOpen() {
    if (isOpen) {
      clear();
      close();
    }
  }

  return (
    <>
      {!isXl ? (
        <AnimatePresence>
          {isOpen ? (
            <motion.aside
              className="scrollbar-sm absolute bottom-0 right-0 top-0 h-full overflow-auto pl-4"
              style={{ width: panelSize.panels.issues }}
              initial={{ translate: "100%", opacity: 0 }}
              animate={{ translate: 0, opacity: 1 }}
              exit={{ translate: "100%", opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <Paper size="m" container="2" classNames={{ base: "flex flex-col gap-3 h-auto" }}>
                {children}
              </Paper>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      ) : (
        <Drawer isOpen={isOpen} onOpenChange={handleDrawerOpen} hideHeader>
          <div className="flex h-auto flex-col gap-3 pt-4">{children}</div>
        </Drawer>
      )}
    </>
  );
}

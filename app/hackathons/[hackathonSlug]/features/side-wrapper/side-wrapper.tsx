"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TSideWrapper } from "./side-wrapper.types";

function SideWrapperContainer({ children }: PropsWithChildren) {
  const isClientOnly = useClientOnly();
  const { panelSize } = useContext(HackathonContext);

  if (isClientOnly) {
    return (
      <AnimatePresence>
        <motion.div
          className="absolute bottom-0 right-0 top-0 h-full overflow-scroll bg-green-500"
          style={{ width: panelSize.panel }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}

export function SideWrapper({ children }: TSideWrapper.Props) {
  const {
    issues: { isOpen, close },
    panelSize,
  } = useContext(HackathonContext);

  return (
    <AnimatePresence>
      <motion.div
        className="bg-red-500"
        style={{ width: panelSize.panel }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <SideWrapperContainer>
          <div className="h-auto bg-pink-500">
            <button onClick={close}>close</button>
          </div>
          {/*<AnimatePresence>*/}
          {/*  {isOpen ? (*/}
          {/*    <motion.aside*/}
          {/*      className="w-full overflow-hidden"*/}
          {/*      initial={{ translate: "100%" }}*/}
          {/*      animate={{ translate: "0%" }}*/}
          {/*      exit={{ translate: "100%" }}*/}
          {/*      transition={{ duration: 0.3, type: "tween" }}*/}
          {/*    >*/}
          {/*      <motion.div>{children}</motion.div>*/}
          {/*    </motion.aside>*/}
          {/*  ) : null}*/}
          {/*</AnimatePresence>*/}
        </SideWrapperContainer>
      </motion.div>
    </AnimatePresence>
  );
}

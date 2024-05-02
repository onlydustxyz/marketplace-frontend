import { AnimatePresence, motion } from "framer-motion";

import { TTransition } from "./transition.types";

export function Transition({ children, show }: TTransition.Props) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key="content"
          initial="collapsed"
          className="overflow-hidden"
          animate="open"
          exit="collapsed"
          variants={{
            open: { height: "auto" },
            collapsed: { height: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

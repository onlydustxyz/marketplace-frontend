"use client";

import { createContext, useState } from "react";

import { THackathonContext } from "./hackathon.context.types";

export const HackathonContext = createContext<THackathonContext.Return>({
  issues: {
    isOpen: false,
    open: () => null,
    close: () => null,
  },
});

export function HackathonContextProvider({ children }: THackathonContext.Props) {
  const [isIssuesOpen, setIsIssuesOpen] = useState<boolean>(false);

  return (
    <HackathonContext.Provider
      value={{
        issues: {
          isOpen: isIssuesOpen,
          open: () => setIsIssuesOpen(true),
          close: () => setIsIssuesOpen(false),
        },
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}

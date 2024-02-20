"use client";

import { useEffect } from "react";

export const useNatifBlock = (shouldBlockNavigation: boolean) => {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    if (shouldBlockNavigation) {
      window.addEventListener("beforeunload", unloadCallback);
    } else {
      window.removeEventListener("beforeunload", unloadCallback);
    }

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [shouldBlockNavigation]);
};

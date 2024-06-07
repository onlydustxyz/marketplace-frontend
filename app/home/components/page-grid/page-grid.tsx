"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

import { useJourney } from "app/home/features/journey/journey.hooks";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { TPageGrid } from "./page-grid.types";

export function PageGrid({ children }: TPageGrid.Props) {
  const { isAuthenticated } = useAuth0();
  const showJourney = useJourney();
  const templateArea = useMemo(() => {
    if (isAuthenticated) {
      if (showJourney) return styles.gridAuthenticatedWithJourney;
      return styles.gridAuthenticated;
    }
    return styles.gridUnauthenticated;
  }, [isAuthenticated, showJourney]);
  return <div className={cn("px w-full gap-x-6 gap-y-12 py-8", templateArea)}>{children}</div>;
}

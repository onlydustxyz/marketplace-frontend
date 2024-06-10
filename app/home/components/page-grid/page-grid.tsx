"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useJourney } from "app/home/features/journey/journey.hooks";
import styles from "app/home/styles/styles.module.css";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { TPageGrid } from "./page-grid.types";

export function PageGrid({ children }: TPageGrid.Props) {
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.lg}px)`);
  const { isAuthenticated } = useAuth0();
  const showJourney = useJourney();

  const classes = useMemo(() => {
    if (isSm) {
      return {
        authenticatedWithJourney: styles.gridAuthenticatedWithJourneySm,
        authenticated: styles.gridAuthenticatedSm,
        unauthenticated: styles.gridUnauthenticatedSm,
      };
    }

    return {
      authenticatedWithJourney: styles.gridAuthenticatedWithJourney,
      authenticated: styles.gridAuthenticated,
      unauthenticated: styles.gridUnauthenticated,
    };
  }, [isSm]);

  const templateArea = useMemo(() => {
    if (isAuthenticated) {
      if (showJourney) return classes.authenticatedWithJourney;
      return classes.authenticated;
    }
    return classes.unauthenticated;
  }, [isAuthenticated, showJourney, classes]);

  return <div className={cn("px w-full gap-x-6 gap-y-12 py-8", templateArea)}>{children}</div>;
}

"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useJourney } from "app/home/features/journey/journey.hooks";
import styles from "app/home/styles/styles.module.css";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TPageGrid } from "./page-grid.types";

export function PageGrid({ children }: TPageGrid.Props) {
  const isLg = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.lg}px)`);
  const { isAuthenticated } = useAuth0();
  const showJourney = useJourney();
  const isClient = useClientOnly();

  const classes = useMemo(() => {
    if (isLg && isClient) {
      return {
        authenticatedWithJourney: styles.gridAuthenticatedWithJourneyLg,
        authenticated: styles.gridAuthenticatedLg,
        unauthenticated: styles.gridUnauthenticatedLg,
      };
    }

    return {
      authenticatedWithJourney: styles.gridAuthenticatedWithJourney,
      authenticated: styles.gridAuthenticated,
      unauthenticated: styles.gridUnauthenticated,
    };
  }, [isLg, isClient]);

  const templateArea = useMemo(() => {
    if (isAuthenticated) {
      if (showJourney) return classes.authenticatedWithJourney;
      return classes.authenticated;
    }
    return classes.unauthenticated;
  }, [isAuthenticated, showJourney, classes, isLg]);

  return <div className={cn("px w-full gap-x-6 gap-y-12 py-8", templateArea)}>{children}</div>;
}

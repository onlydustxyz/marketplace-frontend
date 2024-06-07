"use client";

import { PropsWithChildren } from "react";

import { useJourney } from "app/home/features/journey/journey.hooks";

export function JourneyGuard({ children }: PropsWithChildren) {
  const showJourney = useJourney();
  if (!showJourney) return null;
  return children;
}

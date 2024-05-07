"use client";

import { useEffect } from "react";

import { usePosthog } from "src/hooks/usePosthog";

import { TPosthog } from "./posthog.types";

export function Posthog({ hackathonId }: TPosthog.Props) {
  const { capture } = usePosthog();

  useEffect(() => {
    if (hackathonId) {
      capture("hackathon_viewed", { id_hackathon: hackathonId });
    }
  }, [hackathonId]);

  return null;
}

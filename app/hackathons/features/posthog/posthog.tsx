"use client";

import { useEffect } from "react";

import { usePosthog } from "src/hooks/usePosthog";

export function Posthog() {
  const { capture } = usePosthog();

  useEffect(() => {
    capture("hackathon_list_viewed");
  }, []);

  return null;
}

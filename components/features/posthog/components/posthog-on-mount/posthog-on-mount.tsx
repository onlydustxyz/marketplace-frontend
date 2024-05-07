"use client";

import { useEffect } from "react";

import { usePosthog } from "src/hooks/usePosthog";

import { TPosthogOnMount } from "./posthog-on-mount.types";

export function PosthogOnMount({ eventName, params, paramsReady }: TPosthogOnMount.Props) {
  const { capture } = usePosthog();

  useEffect(() => {
    if (!params) {
      capture(eventName);
    } else if (paramsReady) {
      capture(eventName, params);
    }
  }, [params, paramsReady]);

  return null;
}

"use client";

import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { usePosthog } from "src/hooks/usePosthog";

export function PosthogPageView({ pathname }: { pathname: string }) {
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const { capture } = usePosthog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

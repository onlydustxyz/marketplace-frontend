"use client";

import { useEffect } from "react";

import { usePosthog } from "src/hooks/usePosthog";

export function PosthogPageView() {
  const { posthog, capture } = usePosthog();

  // Track pageviews
  useEffect(() => {
    if (posthog) {
      let previousUrl = "";

      // This method is required because we currently use two routers, causing this event to be fired multiple times
      // Once we only use Next's router we could return to the method used in the docs https://posthog.com/docs/libraries/next-js
      const observer = new MutationObserver(() => {
        if (location.href !== previousUrl) {
          const newUrl = location.href;
          previousUrl = newUrl;

          capture("$pageview", {
            $current_url: newUrl,
          });
        }
      });

      observer.observe(document, { subtree: true, childList: true });
    }
  }, [posthog]);

  return null;
}

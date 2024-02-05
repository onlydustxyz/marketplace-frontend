"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { NextMigratedRoute } from "components/features/navigation/navigation.constant";

/** We should use this to catch all browser router change in order to make it work with next router*/
/** should be use in root layout */
export function NavigationHandler() {
  const router = useRouter();

  useEffect(() => {
    let previousUrl = "";

    const observer = new MutationObserver(() => {
      if (location.pathname !== previousUrl) {
        const newUrl = location.pathname;
        const isTargetRouteNext = NextMigratedRoute.find(route => route.pathName === newUrl);
        const isSourceRouteNext = NextMigratedRoute.find(route => route.pathName === previousUrl);

        console.log(newUrl, previousUrl);

        if (isSourceRouteNext && !isTargetRouteNext) {
          router.push(newUrl);
        } else if (isTargetRouteNext) {
          router.push(newUrl);
        }

        previousUrl = newUrl;
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }, []);

  return null;
}

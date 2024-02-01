"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NextMigratedRoute } from "components/features/navigation/navigation.constant";

/** We should use this to catch all browser router chnage in order to make it work with next router*/
/** should be use in page scopped layout */
export function NavigationNextEvents() {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    const findMigratedRoute = NextMigratedRoute.find(route => route.pathName === location.pathname);
    if (!findMigratedRoute && location.pathname) {
      router.push(location.pathname);
    }
  }, [location]);

  return null;
}

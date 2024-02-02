"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NextMigratedRoute } from "components/features/navigation/navigation.constant";

/** We should use this to catch all browser router change in order to make it work with next router*/
/** should be use in app layout */
export function NavigationReactEvents() {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    const findMigratedRoute = NextMigratedRoute.find(route => route.pathName === location.pathname);
    if (findMigratedRoute) {
      router.push(findMigratedRoute.nextPathName);
    }
  }, [location]);

  return null;
}

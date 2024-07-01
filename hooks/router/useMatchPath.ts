"use client";

import { useParams, usePathname } from "next/navigation";

export type MatchPathOptions = {
  exact?: boolean;
};

const INITIAL_OPTIONS: MatchPathOptions = { exact: true };

/**
 * Check if the current path matches the route template
 * We take the route template and replace the dynamic segments with the actual values
 * Then we compare the current path with the generated route
 * @example useMatchPath("/p/[slug]/overview")
 * @param routeTemplate
 * @param options
 */
export function useMatchPath(routeTemplate: string, options: { exact?: boolean } = INITIAL_OPTIONS) {
  const { exact } = options;

  const currentPath = usePathname();
  const params = useParams();

  const match = routeTemplate
    .split("/")
    .map(segment => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const key = segment.replace("[", "").replace("]", "");
        return params[key];
      }

      return segment;
    })
    .join("/");

  if (exact) return match === currentPath;

  return currentPath.startsWith(match);
}

"use client";

import { TRenderByPath } from "components/layout/components-utils/render-by-path/render-by-path.types";

import { useMatchPath } from "hooks/router/useMatchPath";

export function RenderByPath({ children, path, exact, matches = true }: TRenderByPath.Props) {
  const matchesPath = useMatchPath(path, {
    exact,
  });

  const condition = matches ? matchesPath : !matchesPath;

  return condition ? children : null;
}

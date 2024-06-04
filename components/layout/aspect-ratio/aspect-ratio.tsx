"use client";

import { useEffect, useRef, useState } from "react";

import { useClientOnly } from "components/layout/client-only/client-only";

import { TAspectRatio } from "./aspect-ratio.types";

export function AspectRatio({ ratio, children, breakpoints, initialHeight }: TAspectRatio.Props) {
  const isClient = useClientOnly();
  const [height, setHeight] = useState<string | number>(initialHeight || 0);
  const ref = useRef<HTMLDivElement>(null);

  function getRatio(): TAspectRatio.ratio {
    let r: TAspectRatio.ratio = ratio;
    breakpoints?.forEach(value => {
      if (window.matchMedia(`(max-width: ${value.width}px)`).matches) {
        r = value.ratio;
      }
    });

    return r;
  }
  function resizeElement(elementWidth: number) {
    const r = getRatio();
    const [w, h] = r.split("/").map(Number);
    return (elementWidth * h) / w;
  }

  useEffect(() => {
    if (!ref.current || !isClient) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(resizeElement(ref.current?.clientWidth || 0));
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref, isClient]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height,
      }}
    >
      {children}
    </div>
  );
}

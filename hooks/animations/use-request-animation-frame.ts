"use client";

import { useEffect, useRef } from "react";

import { useClientOnly } from "components/layout/client-only/client-only";

export const useRequestAnimationFrame = (callback: () => void, delay: number, disabled?: boolean) => {
  const isClient = useClientOnly();
  const requestAnimation = useRef<number | undefined>(0);
  const start = useRef(Date.now());

  const animate = () => {
    if (Date.now() - start.current >= delay) {
      start.current += delay;
      callback();
    }
    requestAnimation.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isClient && !disabled) {
      requestAnimation.current = window.requestAnimationFrame(animate);
    }

    return () => {
      if (requestAnimation.current) cancelAnimationFrame(requestAnimation.current);
    };
  }, [isClient, disabled]);
};

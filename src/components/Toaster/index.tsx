"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useToaster } from "src/hooks/useToaster";

import View from "./View";

export const Toaster = () => {
  const { message, visible, isError, setVisible } = useToaster();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<View {...{ message, visible, isError, setVisible }} />, document.body);
};

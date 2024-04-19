"use client";

import { createPortal } from "react-dom";

import { useToaster } from "src/hooks/useToaster";

import { useClientOnly } from "components/layout/client-only/client-only";

import View from "./View";

export const Toaster = () => {
  const { message, visible, isError, setVisible } = useToaster();
  const isClient = useClientOnly();

  if (!isClient) return null;

  return createPortal(<View {...{ message, visible, isError, setVisible }} />, document.body);
};

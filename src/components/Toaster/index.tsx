"use client";

import { createPortal } from "react-dom";

import { useToaster } from "src/hooks/useToaster";

import View from "./View";

export const Toaster = () => {
  const { message, visible, isError, setVisible } = useToaster();

  return createPortal(<View {...{ message, visible, isError, setVisible }} />, document.body);
};

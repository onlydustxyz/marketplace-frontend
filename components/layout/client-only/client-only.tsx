"use client";

import { ComponentType, useEffect, useState } from "react";

import { TClientOnly } from "./client-only.types";

export const useClientOnly = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
export function ClientOnly({ children }: TClientOnly.Props) {
  const isClient = useClientOnly();

  if (!isClient) return null;

  return <>{children}</>;
}

export function withClientOnly<P extends object>(Component: ComponentType<P>) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    return (
      <ClientOnly>
        <Component {...props} />
      </ClientOnly>
    );
  };
}

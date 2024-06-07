"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";

export function RequiredAuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  if (!isAuthenticated) return null;

  return children;
}

export function RequiredUnauthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  if (isAuthenticated) return null;

  return children;
}

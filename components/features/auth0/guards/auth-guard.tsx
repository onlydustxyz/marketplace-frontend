"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren, ReactNode } from "react";

export function RequiredAuthGuard({ children, fallback }: PropsWithChildren<{ fallback?: ReactNode }>) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return fallback;

  if (!isAuthenticated) return null;

  return children;
}

export function RequiredUnauthGuard({ children, fallback }: PropsWithChildren<{ fallback?: ReactNode }>) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return fallback;

  if (isAuthenticated) return null;

  return children;
}

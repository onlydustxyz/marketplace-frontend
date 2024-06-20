"use client";

import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { logoutUser } from "api-client/resources/me/fetch/logout-user";

export const useLogoutUser = (options: { onSuccess?: () => void } = {}) => {
  const { mutation } = useReactQueryAdapter(logoutUser());

  return useMutation({
    ...mutation,
    ...options,
  });
};

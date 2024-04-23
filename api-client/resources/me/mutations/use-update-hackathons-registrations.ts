"use client";

import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import adapters from "../adapters";
import { UpdateHackathonsRegistrationsParams } from "../types";

export const useUpdateHackathonsRegistrations = ({
  hackathonId,
  hackathonSlug,
}: UpdateHackathonsRegistrationsParams) => {
  const fetcher = useReactQueryAdapter(adapters.hackathonRegistrations({ hackathonId, hackathonSlug }));

  return useMutation<unknown>({
    mutationFn: () => fetcher.put(),
  });
};

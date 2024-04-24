"use client";

import { useMutation } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { updateHackathonsRegistrations } from "api-client/resources/me/fetch/update-hackathons-registrations";

import { UpdateHackathonsRegistrationsParams } from "../types";

export const useUpdateHackathonsRegistrations = ({
  hackathonId,
  hackathonSlug,
}: UpdateHackathonsRegistrationsParams) => {
  const fetcher = useReactQueryAdapter(updateHackathonsRegistrations({ hackathonId, hackathonSlug }));

  return useMutation<unknown>({
    mutationFn: () => fetcher.request(),
  });
};

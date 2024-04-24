"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { hackathonsApiClient } from "api-client/resources/hackathons";
import { updateHackathonsRegistrations } from "api-client/resources/me/fetch/update-hackathons-registrations";

import { UpdateHackathonsRegistrationsParams } from "../types";

export const useUpdateHackathonsRegistrations = ({
  hackathonId,
  hackathonSlug,
}: UpdateHackathonsRegistrationsParams) => {
  const fetcher = useReactQueryAdapter(updateHackathonsRegistrations({ hackathonId, hackathonSlug }));
  const queryClient = useQueryClient();
  return useMutation<unknown>({
    mutationFn: () => fetcher.request(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [hackathonsApiClient.tags.by_slug(hackathonSlug)],
        exact: false,
      });
    },
  });
};

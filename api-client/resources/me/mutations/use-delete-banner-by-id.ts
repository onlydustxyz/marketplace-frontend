import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { bannerApiClient } from "api-client/resources/banner";
import { deleteBannerById } from "api-client/resources/me/fetch";

import { CloseBannerPathParams } from "../types";

export const useDeleteBannerById = ({ bannerId }: CloseBannerPathParams) => {
  const { mutation } = useReactQueryAdapter(deleteBannerById({ bannerId }));
  const queryClient = useQueryClient();

  return useMutation({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [bannerApiClient.tags.get_banner],
        exact: false,
      });
    },
  });
};

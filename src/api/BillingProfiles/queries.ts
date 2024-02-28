import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { BILLING_PROFILES_PATH } from "src/api/BillingProfiles/path";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

import { BILLING_PROFILES_TAGS } from "./tags";

export type UseGetBillingProfileById = components["schemas"]["BillingProfileResponse"];
export type UseGetBillingProfilePayout = components["schemas"]["BillingProfilePayoutInfoResponse"];
export type UseGetBillingProfiles = components["schemas"]["MyBillingProfilesResponse"];
export type UseGetBillingCoworkers = components["schemas"]["BillingProfileCoworkersPageResponse"];

const useGetBillingProfileById = ({
  options = {},
  params,
}: UseQueryProps<UseGetBillingProfileById, { id?: string }>) => {
  return useBaseQuery<UseGetBillingProfileById>({
    resourcePath: BILLING_PROFILES_PATH.BY_ID(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.ALL,
    ...options,
  });
};

const useBillingProfiles = ({ options = {} }: UseQueryProps<UseGetBillingProfiles>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetBillingProfiles>({
    resourcePath: BILLING_PROFILES_PATH.ME_BILLING_PROFILES,
    tags: BILLING_PROFILES_TAGS.ME,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

const useGetPayoutInfo = ({ options = {}, params }: UseQueryProps<UseGetBillingProfilePayout, { id?: string }>) => {
  return useBaseQuery<UseGetBillingProfilePayout>({
    resourcePath: BILLING_PROFILES_PATH.PAYOUT(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.ALL,
    ...options,
  });
};

const useGetBillingCoworkers = ({ options = {}, params }: UseQueryProps<UseGetBillingCoworkers, { id?: string }>) => {
  return useBaseQuery<UseGetBillingCoworkers>({
    resourcePath: BILLING_PROFILES_PATH.COWORKERS(params?.id || ""),
    tags: BILLING_PROFILES_TAGS.SINGLE(params?.id || ""),
    ...options,
  });
};

export default {
  useBillingProfiles,
  useGetPayoutInfo,
  useGetBillingProfileById,
  useGetBillingCoworkers,
};

import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { ME_BILLING_TAGS } from "src/api/me/billing/tags";
import { MeTypes } from "src/api/me/types";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";

export type UseAllBillingProfilesResponse = components["schemas"]["MyBillingProfilesResponse"];
const useAllBillingProfiles = ({ options = {} }: UseQueryProps<UseAllBillingProfilesResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseAllBillingProfilesResponse>({
    resourcePath: API_PATH.ME_BILLING_PROFILES,
    tags: ME_BILLING_TAGS.allProfiles,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseBillingProfileIndividualResponse = components["schemas"]["IndividualBillingProfileResponse"];
export type UseBillingProfileCompanyResponse = components["schemas"]["CompanyBillingProfileResponse"];
export type UseBillingProfileResponse = UseBillingProfileIndividualResponse | UseBillingProfileCompanyResponse;
const useBillingProfile = ({
  options = {},
  params,
}: UseQueryProps<UseBillingProfileResponse, { profile?: MeTypes.billingProfileUnion }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseBillingProfileResponse>({
    resourcePath:
      params?.profile === MeTypes.billingProfileType.Company
        ? API_PATH.ME_BILLING_COMPANY
        : API_PATH.ME_BILLING_INDIVIDUAL,
    tags: ME_BILLING_TAGS.profile(params?.profile || MeTypes.billingProfileType.Individual),
    ...options,
    enabled: isAuthenticated && !!params?.profile && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useAllBillingProfiles,
  useBillingProfile,
};

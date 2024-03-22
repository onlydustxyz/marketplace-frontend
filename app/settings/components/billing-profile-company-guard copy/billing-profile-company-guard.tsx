import { useParams, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

export function withBillingProfileCompanyGuard<P extends object>(Component: ComponentType<P>) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { profile, isLoading } = useBillingProfileById({ id, enabledPooling: false });
    const isBillingProfileCompany = profile?.data?.type === BillingProfilesTypes.type.Company;

    useEffect(() => {
      if (isLoading || isBillingProfileCompany) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isBillingProfileCompany]);

    if (isLoading || !isBillingProfileCompany) {
      return <></>;
    }

    return <Component {...props} />;
  };
}

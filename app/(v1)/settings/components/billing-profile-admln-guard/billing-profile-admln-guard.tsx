import { useParams, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

export function withBillingProfileAdminGuard<P extends object>(Component: ComponentType<P>) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { profile, isLoading } = useBillingProfileById({ id, enabledPooling: false });
    const isBillingProfileAdmin = profile?.data?.me?.role === BillingProfilesTypes.ROLE.ADMIN;

    useEffect(() => {
      if (isLoading || isBillingProfileAdmin) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isBillingProfileAdmin]);

    if (isLoading || !isBillingProfileAdmin) {
      return <></>;
    }

    return <Component {...props} />;
  };
}

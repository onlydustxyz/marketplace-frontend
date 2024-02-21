import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import MeApi from "src/api/me";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { NEXT_ROUTER } from "constants/router";

export function withAdminGuard<P extends object>(Component: ComponentType<P>) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const router = useRouter();
    const { isImpersonating } = useImpersonation();

    const { isLoading, isRefetching, data } = MeApi.queries.useGetMe({});
    const { isAdmin } = data ?? {};

    useEffect(() => {
      if (isLoading || isRefetching || isAdmin || isImpersonating) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isRefetching, isAdmin, isImpersonating]);

    if (isLoading || isRefetching || !isAdmin) {
      return <></>;
    }

    return <Component {...props} />;
  };
}

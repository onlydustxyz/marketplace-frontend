import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useMemo } from "react";
import { useSponsorGuard } from "utils/guards/sponsor-guard.hooks";

import { NEXT_ROUTER } from "constants/router";

export const withSponsorGuard = <P extends object>(Component: ComponentType<P>) => {
  return function SponsorGuard(props: P) {
    const router = useRouter();
    const { sponsors, isLoading, isRefetching } = useSponsorGuard();

    const isAllowed = useMemo(() => sponsors.length > 0, [sponsors]);

    useEffect(() => {
      if (isLoading || isRefetching || isAllowed) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isRefetching, isAllowed]);

    if (isLoading || isRefetching) {
      return <></>;
    }

    return isAllowed ? <Component {...props} /> : <></>;
  };
};

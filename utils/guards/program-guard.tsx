import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useMemo } from "react";
import { useProgramGuard } from "utils/guards/program-guard.hooks";

import { NEXT_ROUTER } from "constants/router";

export const withProgramGuard = <P extends object>(Component: ComponentType<P>) => {
  return function SponsorGuard(props: P) {
    const router = useRouter();
    const { programs, isLoading, isRefetching } = useProgramGuard();

    const isAllowed = useMemo(() => programs.length > 0, [programs]);

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
